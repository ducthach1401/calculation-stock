import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../../domain/repositories/calculation-repository';
import { CalculationService } from '../services/calculation-service';

@Injectable()
export class CalculationRepositoryImpl extends CalculationRepository {
  constructor(private readonly calculationService: CalculationService) {
    super();
  }

  async calculateBenjamin(): Promise<Record<string, any>> {
    return this.calculationService.calculateBenjamin();
  }
}
