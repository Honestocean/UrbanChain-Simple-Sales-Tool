import { Test, TestingModule } from '@nestjs/testing';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';
import { createSaleDto } from '../test-sales-data';
import { SalesService } from './sales.service';

const mockSalesRepository = () => ({
  CreateSale: jest.fn(),
});

describe('SalesService', () => {
  let service: SalesService;
  let repository: SalesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        { provide: SalesRepository, useFactory: mockSalesRepository },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    repository = module.get<SalesRepository>(SalesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('POST SUCCESS CreateSale should return a sale', async () => {
    const expectedResult: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
    };

    (repository.CreateSale as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.createSale(createSaleDto);

    expect(repository.CreateSale).toHaveBeenCalledWith(createSaleDto);
    expect(result).toEqual(expectedResult);
  });
});
