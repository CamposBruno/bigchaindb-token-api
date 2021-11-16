import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceApiController } from './get-balance-api.controller';

describe('GetBalanceApiController', () => {
  let controller: GetBalanceApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetBalanceApiController],
    }).compile();

    controller = module.get<GetBalanceApiController>(GetBalanceApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
