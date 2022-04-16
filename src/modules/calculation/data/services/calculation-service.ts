import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalculationService {
  constructor(private readonly httpService: HttpService) {}
  async calculateBenjamin(): Promise<Record<string, any>> {
    const listStock = await this.getNameStockHose();
    return listStock;
  }

  async getNameStockHose() {
    const dataStock = await lastValueFrom(
      this.httpService.get('https://banggia.cafef.vn/stockhandler.ashx'),
    );
    let result = [];
    for (const stock of dataStock.data) {
      if (stock.a.length == 3) {
        result.push(stock.a);
      }
    }
    return result;
  }
}
