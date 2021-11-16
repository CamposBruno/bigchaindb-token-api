import { Module } from '@nestjs/common';
import { CreateTokenModule } from '../../../usecases/create-token/create-token.module';
import { CreateTokenApiController } from './create-token-api.controller';

@Module({
  imports: [CreateTokenModule],
  controllers: [CreateTokenApiController],
})
export class CreateTokenApiModule {}
