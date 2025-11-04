import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';

@Injectable()
export class SalesService {
  constructor(private salesRepository: SalesRepository) {}

  async getSales(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  async getSaleById(id: string): Promise<Sale> {
    const sale = await this.salesRepository.findOne({ where: { id } });

    if (!sale) throw new NotFoundException(`Sale with ID ${id} not found`);

    return sale;
  }

  async createSale(salesDto: CreateSaleDto): Promise<Sale> {
    return this.salesRepository.createSale(salesDto);
  }
}
