import { CreateSaleDto } from './controller/dto/create-sale.dto';
import { SaleStatus } from './sale-status.enum';

export const createSaleDto: CreateSaleDto = {
  name: 'Energy Supply Account',
  customerName: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  mpans: ['1234567890122', '9876543210987'],
  contractStartDate: '2024-01-01',
  contractEndDate: '2025-01-01',
  status: SaleStatus.ACTIVE,
};
