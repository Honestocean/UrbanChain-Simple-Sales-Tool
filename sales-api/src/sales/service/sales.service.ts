import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';
import { SaleStatus } from '../sale-status.enum';

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

  async updateSale(id: string, status: SaleStatus): Promise<Sale> {
    const sale = await this.getSaleById(id);

    sale.status = status;

    await this.salesRepository.save(sale);
    return sale;
  }

  async deleteSale(id: string): Promise<void> {
    const result = await this.salesRepository.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }
}
