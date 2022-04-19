import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../repositories/calculation-repository';

@Injectable()
export class GetAllPriceUsecase {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async call(): Promise<any> {
    return this.calculationRepository.getAllPrice();
  }
}
