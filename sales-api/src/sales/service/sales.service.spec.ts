import { Test, TestingModule } from '@nestjs/testing';
import { Sale } from '../repository/Entity/sale.entity';
import { SalesRepository } from '../repository/sales.repository';
import { SaleStatus } from '../sale-status.enum';
import { createSaleDto } from '../test-sales-data';
import { SalesService } from './sales.service';

const mockSalesRepository = () => ({
  createSale: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
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

  it('GET SUCCESS getSales should return all sales', async () => {
    const expectedResult: Sale[] = [
      {
        id: '1',
        createdDate: new Date().toUTCString(),
        ...createSaleDto,
      },
    ];

    (repository.find as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.getSales();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('GET SUCCESS getSaleById should return a sale', async () => {
    const expectedResult: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.getSaleById('1');

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(expectedResult);
  });

  it('GET FAILURE getSaleById should throw a not found acception if no sale with that ID is found', async () => {
    (repository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.getSaleById('1')).rejects.toThrow(
      'Sale with ID 1 not found',
    );

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('POST SUCCESS CreateSale should return a sale', async () => {
    const expectedResult: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
    };

    (repository.createSale as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.createSale(createSaleDto);

    expect(repository.createSale).toHaveBeenCalledWith(createSaleDto);
    expect(result).toEqual(expectedResult);
  });

  it('PATCH SUCCESS updateSale should return an update sale on succesful update', async () => {
    const mockSale: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
      status: 'PENDING' as SaleStatus,
    };

    const updatedSale = { ...mockSale, status: 'COMPLETED' as SaleStatus };

    (repository.findOne as jest.Mock).mockResolvedValue(mockSale);
    (repository.save as jest.Mock) = jest.fn().mockResolvedValue(updatedSale);

    const result = await service.updateSale('1', 'COMPLETED' as SaleStatus);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(repository.save).toHaveBeenCalledWith(updatedSale);
    expect(result.status).toEqual('COMPLETED');
  });

  it('DELETE SUCCESS deleteSale should delete a sale', async () => {
    (repository.delete as jest.Mock) = jest
      .fn()
      .mockResolvedValue({ affected: 1 });

    await service.deleteSale('1');

    expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
  });

  it('DELETE FAILURE deleteSale should throw a not found exception if no sale with that ID is found', async () => {
    (repository.delete as jest.Mock) = jest
      .fn()
      .mockResolvedValue({ affected: 0 });

    await expect(service.deleteSale('1')).rejects.toThrow(
      'Task with ID 1 not found',
    );

    expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
  });
});
