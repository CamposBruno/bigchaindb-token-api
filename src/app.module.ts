import { Module } from '@nestjs/common';
import { ApiModule } from './adapters/api/api.module';

@Module({
  imports: [ApiModule],
})
export class AppModule {}
