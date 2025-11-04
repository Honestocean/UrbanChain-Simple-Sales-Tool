import { Body, Controller, Post } from '@nestjs/common';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesService } from '../service/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.createSale(createSaleDto);
  }
}
