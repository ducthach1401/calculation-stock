import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import database from 'src/config/database';
import { CalculationController } from './app/http/controllers/calculation-controller';
import { CalculationDatasource } from './data/database/calculation-datasource';
import {
  CalculationEntity,
  StockEpsEntity,
} from './data/database/entities/calculation-entity';
import { CalculationRepositoryImpl } from './data/repositories/calculation-repository-impl';
import { CalculationService } from './data/services/calculation-service';
import { CalculationRepository } from './domain/repositories/calculation-repository';
import { CalculateBenjaminUsecase } from './domain/usecases/calculate-benjamin-usecase';
import { GetAllPriceUsecase } from './domain/usecases/get-all-price-usecase';
import { GetBenjaminUsecase } from './domain/usecases/get-benjamin-usecase';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('database'),
    }),
    TypeOrmModule.forFeature([CalculationEntity, StockEpsEntity]),
  ],
  controllers: [CalculationController],
  providers: [
    CalculateBenjaminUsecase,
    {
      provide: CalculationRepository,
      useClass: CalculationRepositoryImpl,
    },
    CalculationService,
    CalculationDatasource,
    GetBenjaminUsecase,
    GetAllPriceUsecase,
  ],
})
export class CalculationModule {}
