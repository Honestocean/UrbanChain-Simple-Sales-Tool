import { Test, TestingModule } from '@nestjs/testing';
import { SaleStatus } from '../sale-status.enum';
import { SalesService } from '../service/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesController } from './sales.controller';

const mockSalesService = () => ({
  createSale: jest.fn(),
});

const createSaleDto: CreateSaleDto = {
  name: 'Energy Supply Account',
  customerName: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  mpans: ['1234567890122', '9876543210987'],
  contractStartDate: '2024-01-01',
  contractEndDate: '2025-01-01',
  status: SaleStatus.ACTIVE,
};

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [{ provide: SalesService, useFactory: mockSalesService }],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST SUCCESS CreateSale should return a sale', async () => {
    const expectedResult = { id: '1', ...createSaleDto };

    (service.createSale as jest.Mock).mockResolvedValue(expectedResult);

    const result = await controller.createSale(createSaleDto);

    expect(service.createSale).toHaveBeenCalledWith(createSaleDto);
    expect(result).toEqual(expectedResult);
  });
});
