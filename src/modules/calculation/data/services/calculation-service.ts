import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CalculationDatasource } from '../database/calculation-datasource';

@Injectable()
export class CalculationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly calculationDatasource: CalculationDatasource,
  ) {}
  private readonly PE = 7;
  private readonly Risk = 3.6;
  private readonly Y = 4.7;

  async calculateBenjamin(): Promise<boolean> {
    const listStock = await this.getNameStockHose();
    let result = [];
    for (const stock of listStock) {
      const price = await this.calculate(stock);
      const data = {
        eps: price[0],
        price_rating_1: price[1],
        price_rating_2: price[2],
        safe_price: Math.round(price[1] * (1 - 0.12)),
      };
      const check = await this.calculationDatasource.findOne('XXX');
      if (check == undefined) {
        await this.calculationDatasource.create({
          code: stock,
          ...data,
        });
      } else {
        await this.calculationDatasource.update(stock, data);
      }
    }
    return true;
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
      if (data.EPS >= -10) {
        result.push(data.EPS * 1000);
      }
    }
    return result.reverse();
  }

  async recipeBenjamin(nEps: number, g: number) {
    return (nEps * (this.PE + g) * this.Risk) / this.Y;
  }

  async getNormalizedEps(nameStock: string) {
    const stockEps = await this.getEpsStock(nameStock);
    let temp = 0;
    for (let i = 1; i < stockEps.length; i++) {
      temp = (stockEps[i] / stockEps[i - 1] - 1) * 100;
      if (temp >= 50) {
        if (stockEps[i - 1] > 0) {
          stockEps[i] = Math.round(stockEps[i - 1] * 1.1);
        }
      }
    }

    let ave = 0;
    for (const stock of stockEps) {
      ave += stock;
    }
    ave /= stockEps.length;
    return Math.round(ave);
  }

  async calculate(name: string, g1: number = 10, g2: number = 15) {
    const nEps = await this.getNormalizedEps(name);
    return [
      nEps,
      Math.round((nEps * (this.PE + g1) * this.Risk) / this.Y),
      Math.round((nEps * (this.PE + g2) * this.Risk) / this.Y),
    ];
  }
}
