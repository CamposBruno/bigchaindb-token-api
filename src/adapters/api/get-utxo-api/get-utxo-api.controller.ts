import { Controller, Get, Query } from '@nestjs/common';
import { GetUtxoService } from '../../../usecases/get-utxo/get-utxo.service';

export class GetUtxoDto {
  publickey: string;
  token: string;
}

@Controller('get-utxo')
export class GetUtxoApiController {
  constructor(private getUtxoService: GetUtxoService) {}

  @Get('/')
  async getUtxo(@Query() dto: GetUtxoDto): Promise<any> {
    return this.getUtxoService.utxo(dto);
  }
}
