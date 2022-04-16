import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CalculationController } from './app/http/controllers/calculation-controller';
import { CalculationRepositoryImpl } from './data/repositories/calculation-repository-impl';
import { CalculationService } from './data/services/calculation-service';
import { CalculationRepository } from './domain/repositories/calculation-repository';
import { CalculateBenjaminUsecase } from './domain/usecases/calculate-benjamin-usecase';

@Module({
  imports: [HttpModule],
  controllers: [CalculationController],
  providers: [
    CalculateBenjaminUsecase,
    {
      provide: CalculationRepository,
      useClass: CalculationRepositoryImpl,
    },
    CalculationService,
  ],
})
export class CalculationModule {}
