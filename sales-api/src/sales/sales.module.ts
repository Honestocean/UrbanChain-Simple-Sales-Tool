import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './controller/sales.controller';
import { Sale } from './repository/Entity/sale.entity';
import { SalesRepository } from './repository/sales.repository';
import { SalesService } from './service/sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  controllers: [SalesController],
  providers: [SalesService, SalesRepository],
})
export class SalesModule {}
