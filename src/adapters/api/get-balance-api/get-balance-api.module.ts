import { Module } from '@nestjs/common';
import { GetBalanceModule } from '../../../usecases/get-balance/get-balance.module';
import { GetBalanceApiController } from './get-balance-api.controller';

@Module({
  imports: [GetBalanceModule],
  controllers: [GetBalanceApiController],
})
export class GetBalanceApiModule {}
