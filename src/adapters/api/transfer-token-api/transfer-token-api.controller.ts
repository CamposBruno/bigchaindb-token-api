import { Body, Controller, Post } from '@nestjs/common';
import {
  TransferTokenService,
  TransactionOutputs,
} from '../../../usecases/transfer-token/transfer-token.service';

export class TransferTokenDto {
  from: string;
  to: string;
  amount: number;
  outputs: TransactionOutputs[];
  meta?: any;
}

@Controller('transfer-token')
export class TransferTokenApiController {
  constructor(private transferTokenService: TransferTokenService) {}

  @Post('/')
  async transferToken(@Body() dto: TransferTokenDto): Promise<any> {
    return this.transferTokenService.transfer(dto);
  }
}
