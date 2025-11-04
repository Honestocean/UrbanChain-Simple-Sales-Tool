import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';

@Injectable()
export class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  async getSales(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  async createSale(salesDto: CreateSaleDto): Promise<Sale> {
    return this.salesRepository.createSale(salesDto);
  }
}
