import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  name: string;
}
