import { Inject, Injectable } from '@nestjs/common';
import { BigchaindbProvider } from '../../adapters/bigchaindb/bigchaindb.provider';

@Injectable()
export class GetBalanceService {
  constructor(
    @Inject('BigchainDB') private readonly bigchaindb: BigchaindbProvider,
  ) {}

  async balance({ publickey }) {
    const outputs = await this.bigchaindb.connection.listOutputs(
      publickey,
      false,
    );

    const balances = await Promise.all(
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

        if (asset) {
          return {
            token: asset.data['token'],
            output: transaction.outputs[output.output_index],
          };
        }
      }),
    );

    return balances.filter(Boolean).reduce((acc, item) => {
      acc[item.token] = (acc[item.token] || 0) + Number(item.output.amount);
      return acc;
    }, {});
  }
}
