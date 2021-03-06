import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../repositories/calculation-repository';

@Injectable()
export class CalculateBenjaminUsecase {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async call(): Promise<boolean> {
    return this.calculationRepository.calculateBenjamin();
  }
}
