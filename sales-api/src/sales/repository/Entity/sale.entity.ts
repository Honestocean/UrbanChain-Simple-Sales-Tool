import { SaleStatus } from 'src/sales/sale-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  customerName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column('text', { array: true })
  mpans: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: string;

  @Column()
  contractStartDate: string;

  @Column()
  contractEndDate: string;

  @Column()
  status: SaleStatus;
}
