import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CalculationEntity,
  StockEpsEntity,
} from './entities/calculation-entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalculationDatasource {
  constructor(
    @InjectRepository(CalculationEntity)
    private readonly calculationRepository: Repository<CalculationEntity>,
    @InjectRepository(StockEpsEntity)
    private readonly stockEpsEntity: Repository<StockEpsEntity>,
  ) {}

  async create(data: any) {
    const newData = new CalculationEntity();
    newData.code = data.code;
    newData.eps = data.eps;
    newData.price_rating_1 = data.price_rating_1;
    newData.price_rating_2 = data.price_rating_2;
    newData.safe_price = data.safe_price;
    await this.calculationRepository.save(newData);
    return true;
  }

  async update(name: string, data: any) {
    await this.calculationRepository.update(
      {
        code: name,
      },
      data,
    );
    return true;
  }

  async findOne(name: string) {
    return await this.calculationRepository.findOne({
      where: {
        code: name,
      },
    });
  }

  async find() {
    return await this.calculationRepository.find({});
  }

  async findEps(name: string) {
    return await this.stockEpsEntity.findOne({
      where: {
        name: name,
      },
    });
  }
}
