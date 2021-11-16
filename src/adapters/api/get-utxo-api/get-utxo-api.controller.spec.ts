import { Test, TestingModule } from '@nestjs/testing';
import { GetUtxoApiController } from './get-utxo-api.controller';

describe('GetUtxoApiController', () => {
  let controller: GetUtxoApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUtxoApiController],
    }).compile();

    controller = module.get<GetUtxoApiController>(GetUtxoApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
