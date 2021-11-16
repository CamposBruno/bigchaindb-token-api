import { Inject, Injectable } from '@nestjs/common';
import * as BigchainDB from 'bigchaindb-driver';
import {
  TransactionOutput,
  TransactionUnspentOutput,
} from 'bigchaindb-driver/types/transaction';
import { BigchaindbProvider } from '../../adapters/bigchaindb/bigchaindb.provider';
import users from '../../data/users';

export interface TransactionOutputs {
  transactionId: string;
  outputs: number[];
}

@Injectable()
export class TransferTokenService {
  constructor(
    @Inject('BigchainDB') private readonly bigchaindb: BigchaindbProvider,
  ) {}

  async transfer({ from, to, amount, outputs: transactionOutputs, meta = {} }) {
    const fromUser = this.bigchaindb.deriveUser(users(from));
    const toUser = this.bigchaindb.deriveUser(users(to));

    const inputs = (
      await Promise.all(transactionOutputs.map((tx) => this.createInput(tx)))
    ).flat() as TransactionUnspentOutput[];

    const outputs = this.createOutputs(
      fromUser,
      toUser,
      amount,
      this.getTotalInputAmount(inputs),
    );

    const metadata = {
      date: new Date(),
      ...meta,
    };

    // Create transfer transaction
    const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
      inputs,
      outputs,
      metadata,
    );

    // Sign the transaction with the tokenCreator key
    const signedTransfer = BigchainDB.Transaction.signTransaction(
      createTranfer,
      fromUser.privateKey,
    );

    return this.bigchaindb.connection.postTransactionCommit(signedTransfer);
  }

  getTotalInputAmount(inputs: TransactionUnspentOutput[]) {
    return inputs.reduce(
      (total, input) =>
        total + Number(input.tx.outputs[input.output_index].amount),
      0,
    );
  }

  async createInput(
    txOutputs: TransactionOutputs,
  ): Promise<TransactionUnspentOutput[]> {
    const tx = await this.bigchaindb.connection.getTransaction(
      txOutputs.transactionId,
    );

    return txOutputs.outputs.map((output_index) => {
      return { tx, output_index };
    });
  }

  createOutputs(
    fromUser,
    toUser,
    amountToSend,
    totalInputAmount,
  ): TransactionOutput[] {
    const outputs = [
      BigchainDB.Transaction.makeOutput(
        BigchainDB.Transaction.makeEd25519Condition(toUser.publicKey),
        amountToSend.toString(),
      ),
    ];

    // check if there is some change to be sent back to the creator
    if (totalInputAmount - amountToSend) {
      outputs.push(
        BigchainDB.Transaction.makeOutput(
          BigchainDB.Transaction.makeEd25519Condition(fromUser.publicKey),
          (totalInputAmount - amountToSend).toString(),
        ),
      );
    }

    return outputs;
  }
}
