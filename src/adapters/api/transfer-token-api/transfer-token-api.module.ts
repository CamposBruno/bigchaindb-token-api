import { Module } from '@nestjs/common';
import { TransferTokenModule } from '../../../usecases/transfer-token/transfer-token.module';
import { TransferTokenApiController } from './transfer-token-api.controller';

@Module({
  imports: [TransferTokenModule],
  controllers: [TransferTokenApiController],
})
export class TransferTokenApiModule {}
