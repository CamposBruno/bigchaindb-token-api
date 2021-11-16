import { Body, Controller, Post } from '@nestjs/common';
import { CreateTokenService } from '../../../usecases/create-token/create-token.service';

export class CreateTokenDto {
  token: string;
  supply: number;
  meta?: any;
}

@Controller('create-token')
export class CreateTokenApiController {
  constructor(private createTokenService: CreateTokenService) {}

  @Post('/')
  async createToken(@Body() dto: CreateTokenDto): Promise<any> {
    return this.createTokenService.create(dto);
  }
}
