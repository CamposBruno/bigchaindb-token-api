import { Module } from '@nestjs/common';
import { BigchaindbModule } from '../../adapters/bigchaindb/bigchaindb.module';
import { CreateTokenService } from './create-token.service';

@Module({
  imports: [BigchaindbModule],
  providers: [CreateTokenService],
  exports: [CreateTokenService],
})
export class CreateTokenModule {}
