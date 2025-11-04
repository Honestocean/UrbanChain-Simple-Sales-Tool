import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [SalesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
