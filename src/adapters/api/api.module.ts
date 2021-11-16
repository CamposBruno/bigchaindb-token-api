import { Module } from '@nestjs/common';
import { CreateTokenApiModule } from './create-token-api/create-token-api.module';
import { TransferTokenApiModule } from './transfer-token-api/transfer-token-api.module';
import { GetBalanceApiModule } from './get-balance-api/get-balance-api.module';
import { GetUtxoApiModule } from './get-utxo-api/get-utxo-api.module';

@Module({
  imports: [
    CreateTokenApiModule,
    TransferTokenApiModule,
    GetBalanceApiModule,
    GetUtxoApiModule,
  ],
})
export class ApiModule {}
