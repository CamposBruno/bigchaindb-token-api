import { Module } from '@nestjs/common';
import { BigchaindbModule } from '../../adapters/bigchaindb/bigchaindb.module';
import { GetUtxoService } from './get-utxo.service';

@Module({
  imports: [BigchaindbModule],
  providers: [GetUtxoService],
  exports: [GetUtxoService],
})
export class GetUtxoModule {}
