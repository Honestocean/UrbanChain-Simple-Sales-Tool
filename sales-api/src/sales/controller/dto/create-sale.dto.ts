import { IsDateString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { SaleStatus } from '../../sale-status.enum';

export class CreateSaleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mpans: string[];

  @IsNotEmpty()
  @IsDateString()
  contractStartDate: string;

  @IsNotEmpty()
  @IsDateString()
  contractEndDate: string;

  @IsEnum(SaleStatus)
  status: SaleStatus;
}
