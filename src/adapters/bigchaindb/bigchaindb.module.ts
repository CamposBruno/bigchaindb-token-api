import { Module } from '@nestjs/common';
import { BigchaindbProvider } from './bigchaindb.provider';

const BigchainProvider = {
  provide: 'BigchainDB',
  useClass: BigchaindbProvider,
};

@Module({
  providers: [BigchainProvider],
  exports: [BigchainProvider],
})
export class BigchaindbModule {}
