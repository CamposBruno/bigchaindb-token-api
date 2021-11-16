import { Inject, Injectable } from '@nestjs/common';
import { BigchaindbProvider } from '../../adapters/bigchaindb/bigchaindb.provider';

@Injectable()
export class GetUtxoService {
  constructor(
    @Inject('BigchainDB') private readonly bigchaindb: BigchaindbProvider,
  ) {}

  async utxo({ publickey, token }) {
    const outputs = await this.bigchaindb.connection.listOutputs(
      publickey,
      false,
    );

    const unspentOutputs = await Promise.all(
      outputs.map(async (output) => {
        const transaction = await this.bigchaindb.connection.getTransaction(
          output.transaction_id,
        );

        let asset = transaction.asset;
        const operation = transaction.operation as 'CREATE' | 'TRANSFER';

        if (operation === 'TRANSFER') {
          asset = (
            await this.bigchaindb.connection.searchAssets(
              transaction.asset['id'],
            )
          ).pop();
        }

        if (asset && asset.data['token'] === token) {
          return transaction;
        }
      }),
    );

    return unspentOutputs.filter(Boolean);
  }
}
