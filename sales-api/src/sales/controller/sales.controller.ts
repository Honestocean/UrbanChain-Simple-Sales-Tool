import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from '../service/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto): Promise<any> {
    return this.salesService.createSale(createSaleDto);
  }
}
