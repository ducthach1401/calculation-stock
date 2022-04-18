import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../repositories/calculation-repository';

@Injectable()
export class GetBenjaminUsecase {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async call() {
    return this.calculationRepository.getBenjamin();
  }
}
