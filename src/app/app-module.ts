import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from 'src/config/app';
import { CalculationModule } from 'src/modules/calculation/calculation-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
    }),
    CalculationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
