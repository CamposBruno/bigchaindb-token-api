import { Module } from '@nestjs/common';
import { BigchaindbModule } from '../../adapters/bigchaindb/bigchaindb.module';
import { GetBalanceService } from './get-balance.service';

@Module({
  imports: [BigchaindbModule],
  providers: [GetBalanceService],
  exports: [GetBalanceService],
})
export class GetBalanceModule {}
