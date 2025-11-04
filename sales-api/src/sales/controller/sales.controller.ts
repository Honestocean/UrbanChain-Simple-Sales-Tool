import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from '../service/sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  async createSale(@Body() createSaleDto: any): Promise<any> {
    return this.salesService.createSale(createSaleDto);
  }
}
