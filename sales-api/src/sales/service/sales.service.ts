import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';

@Injectable()
export class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  async createSale(salesDto: CreateSaleDto): Promise<Sale> {
    return this.salesRepository.CreateSale(salesDto);
  }
}
