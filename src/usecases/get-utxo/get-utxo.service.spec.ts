import { Test, TestingModule } from '@nestjs/testing';
import { GetUtxoService } from './get-utxo.service';

describe('GetUtxoService', () => {
  let service: GetUtxoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUtxoService],
    }).compile();

    service = module.get<GetUtxoService>(GetUtxoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
