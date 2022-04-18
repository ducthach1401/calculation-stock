import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CalculateBenjaminUsecase } from 'src/modules/calculation/domain/usecases/calculate-benjamin-usecase';
import { GetBenjaminUsecase } from 'src/modules/calculation/domain/usecases/get-benjamin-usecase';

@Controller('stock')
export class CalculationController {
  constructor(
    private readonly calculateBenjaminUsecase: CalculateBenjaminUsecase,
    private readonly getBenjaminUsecase: GetBenjaminUsecase,
  ) {}

  @Get('calculate')
  async caculateBenjamin(@Res() res: Response): Promise<Response> {
    await this.calculateBenjaminUsecase.call();
    return res.status(HttpStatus.OK).json(true);
  }

  @Get()
  async getBenjamin(@Res() res: Response): Promise<Response> {
    const data = await this.getBenjaminUsecase.call();
    return res.status(HttpStatus.OK).json(data);
  }
}
