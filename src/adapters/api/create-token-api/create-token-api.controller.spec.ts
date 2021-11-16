import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokenApiController } from './create-token-api.controller';

describe('CreateTokenApiController', () => {
  let controller: CreateTokenApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTokenApiController],
    }).compile();

    controller = module.get<CreateTokenApiController>(CreateTokenApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
