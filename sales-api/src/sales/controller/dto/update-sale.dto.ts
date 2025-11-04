import { IsEnum } from 'class-validator';
import { SaleStatus } from '../../sale-status.enum';

export class UpdateSaleDto {
  @IsEnum(SaleStatus)
  status: SaleStatus;
}
