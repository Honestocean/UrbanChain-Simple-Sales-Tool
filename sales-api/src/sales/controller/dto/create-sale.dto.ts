import { IsDateString, IsEmail, IsIn, IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @IsIn(['active', 'inactive', 'pending', 'cancelled'])
  status: string;
}
