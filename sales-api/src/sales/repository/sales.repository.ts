import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { Sale } from './Entity/sale.entity';

// NOTE: to make the repo layer work I have had to treat it like a provider and use @Injectable
@Injectable()
export class SalesRepository extends Repository<Sale> {
  constructor(private dataSource: DataSource) {
    super(Sale, dataSource.createEntityManager());
  }

  async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = this.create({ ...createSaleDto });

    await this.save(sale);
    return sale;
  }
}
