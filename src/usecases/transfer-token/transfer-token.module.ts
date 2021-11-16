import { Module } from '@nestjs/common';
import { BigchaindbModule } from '../../adapters/bigchaindb/bigchaindb.module';
import { TransferTokenService } from './transfer-token.service';

@Module({
  imports: [BigchaindbModule],
  providers: [TransferTokenService],
  exports: [TransferTokenService],
})
export class TransferTokenModule {}
