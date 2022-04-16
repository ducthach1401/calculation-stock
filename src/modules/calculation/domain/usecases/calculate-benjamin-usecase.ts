import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../repositories/calculation-repository';

@Injectable()
export class CalculateBenjaminUsecase {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async call(): Promise<Record<string, any>> {
    return this.calculationRepository.calculateBenjamin();
  }
}
