import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesService } from '../service/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

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

  @Patch('/:id')
  async updateSale(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<Sale> {
    const { status } = updateSaleDto;
    return await this.salesService.updateSale(id, status);
  }

  @Delete('/:id')
  async deleteSale(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.salesService.deleteSale(id);
  }
}
