import { Test, TestingModule } from '@nestjs/testing';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesService } from '../service/sales.service';
import { createSaleDto } from '../test-sales-data';
import { SalesController } from './sales.controller';

const mockSalesService = () => ({
  createSale: jest.fn(),
});

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

  it('GET SUCCESS getSales should return all sales', async () => {
    const expectedResult: Sale[] = [
      {
        id: '1',
        createdDate: new Date().toUTCString(),
        ...createSaleDto,
      },
    ];

    service.getSales = jest.fn().mockResolvedValue(expectedResult);

    const result = await controller.getSales();

    expect(service.getSales).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('POST SUCCESS CreateSale should return a sale', async () => {
    const expectedResult: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
    };

    (service.createSale as jest.Mock).mockResolvedValue(expectedResult);

    const result = await controller.createSale(createSaleDto);

    expect(service.createSale).toHaveBeenCalledWith(createSaleDto);
    expect(result).toEqual(expectedResult);
  });
});
