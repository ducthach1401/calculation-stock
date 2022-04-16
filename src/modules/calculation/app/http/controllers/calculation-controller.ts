import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CalculateBenjaminUsecase } from 'src/modules/calculation/domain/usecases/calculate-benjamin-usecase';

@Controller('stock')
export class CalculationController {
  constructor(
    private readonly calculateBenjaminUsecase: CalculateBenjaminUsecase,
  ) {}

  @Get()
  async caculateBenjamin(@Res() res: Response): Promise<Response> {
    const dataStock = await this.calculateBenjaminUsecase.call();
    return res.status(HttpStatus.OK).json(dataStock);
  }
}
