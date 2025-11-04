import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesService } from '../service/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}
  @Get()
  async getSales(): Promise<Sale[]> {
    return this.salesService.getSales();
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Sale> {
    return await this.salesService.getSaleById(id);
  }

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.createSale(createSaleDto);
  }
}
