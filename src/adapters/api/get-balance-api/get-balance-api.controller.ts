import { Controller, Get, Query } from '@nestjs/common';
import { GetBalanceService } from 'src/usecases/get-balance/get-balance.service';

export class GetBalanceDto {
  publickey: string;
}

@Controller('get-balance')
export class GetBalanceApiController {
  constructor(private getBalanceService: GetBalanceService) {}

  @Get('/')
  async getBalance(@Query() dto: GetBalanceDto): Promise<any> {
    return this.getBalanceService.balance(dto);
  }
}
