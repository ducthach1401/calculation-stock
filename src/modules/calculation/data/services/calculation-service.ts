import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalculationService {
  constructor(private readonly httpService: HttpService) {}
  private readonly PE = 7;
  private readonly Risk = 3.6;
  private readonly Y = 4.7;

  async calculateBenjamin(): Promise<Record<string, any>> {
    this.getNormalizedEps('FLC');
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

  async getEpsStock(name: string) {
    const dataStock = await lastValueFrom(
      this.httpService.get(`https://e.cafef.vn/fi.ashx?symbol=${name}`),
    );
    let result = [];
    for (const data of dataStock.data) {
      result.push(data.EPS);
    }
    return result.reverse();
  }

  async recipeBenjamin(nEps: number, g: number) {
    return (nEps * (this.PE + g) * this.Risk) / this.Y;
  }

  async getNormalizedEps(nameStock: string) {
    const stockEps = await this.getEpsStock(nameStock);
    let abnormalEps = [];
    let normalEps = [];
    let temp = 0;
    for (let eps of stockEps) {
      temp += eps;
    }
    temp = temp / stockEps.length;
    console.log(temp);
  }
}
