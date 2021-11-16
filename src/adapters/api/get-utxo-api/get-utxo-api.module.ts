import { Module } from '@nestjs/common';
import { GetUtxoModule } from '../../../usecases/get-utxo/get-utxo.module';
import { GetUtxoApiController } from './get-utxo-api.controller';

@Module({
  imports: [GetUtxoModule],
  controllers: [GetUtxoApiController],
})
export class GetUtxoApiModule {}
