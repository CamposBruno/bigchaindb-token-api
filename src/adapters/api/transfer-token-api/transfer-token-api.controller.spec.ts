import { Test, TestingModule } from '@nestjs/testing';
import { TransferTokenApiController } from './transfer-token-api.controller';

describe('TransferTokenApiController', () => {
  let controller: TransferTokenApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferTokenApiController],
    }).compile();

    controller = module.get<TransferTokenApiController>(TransferTokenApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
