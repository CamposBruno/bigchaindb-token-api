import { Inject, Injectable } from '@nestjs/common';
import * as BigchainDB from 'bigchaindb-driver';
import { BigchaindbProvider } from '../../adapters/bigchaindb/bigchaindb.provider';
import users from '../../data/users';

@Injectable()
export class CreateTokenService {
  constructor(
    @Inject('BigchainDB') private readonly bigchaindb: BigchaindbProvider,
  ) {}

  create({ token, supply, meta = {} }) {
    const tokenCreator = this.bigchaindb.deriveUser(users('coinbase'));

    const metadata = {
      date: new Date(),
      ...meta,
    };

    // Construct a transaction payload
    const tx = BigchainDB.Transaction.makeCreateTransaction(
      {
        token,
        supply,
      },
      // Metadata field, contains information about the transaction itself
      // (can be `null` if not needed)
      metadata,
      // Output: Divisible asset, include nTokens as parameter
      [
        BigchainDB.Transaction.makeOutput(
          BigchainDB.Transaction.makeEd25519Condition(tokenCreator.publicKey),
          supply.toString(),
        ),
      ],
      tokenCreator.publicKey,
    );

    // Sign the transaction with the private key of the token creator
    const txSigned = BigchainDB.Transaction.signTransaction(
      tx,
      tokenCreator.privateKey,
    );

    // Send the transaction off to BigchainDB
    return this.bigchaindb.connection.postTransactionCommit(txSigned);
  }
}
