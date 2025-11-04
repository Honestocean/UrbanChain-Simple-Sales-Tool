import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  constructor() {}

  async createSale(salesDto: any): Promise<any> {
    return { sale: 'sale made' };
  }
}
