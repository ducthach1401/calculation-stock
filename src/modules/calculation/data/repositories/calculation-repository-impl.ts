import { Injectable } from '@nestjs/common';
import { CalculationRepository } from '../../domain/repositories/calculation-repository';
import { CalculationDatasource } from '../database/calculation-datasource';
import { CalculationService } from '../services/calculation-service';

@Injectable()
export class CalculationRepositoryImpl extends CalculationRepository {
  constructor(
    private readonly calculationService: CalculationService,
    private readonly calculationDatasource: CalculationDatasource,
  ) {
    super();
  }

  async calculateBenjamin(): Promise<boolean> {
    return this.calculationService.calculateBenjamin();
  }

  async getBenjamin(): Promise<any> {
    return this.calculationDatasource.find();
  }
}
