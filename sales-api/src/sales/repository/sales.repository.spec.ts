import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { createSaleDto } from '../test-sales-data';
import { Sale } from './Entity/sale.entity';
import { SalesRepository } from './sales.repository';

const mockDataSource = () => ({
  createEntityManager: jest.fn().mockReturnValue({
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  }),
});

describe('SalesRepository', () => {
  let repository: SalesRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesRepository,
        { provide: DataSource, useFactory: mockDataSource },
      ],
    }).compile();

    repository = module.get<SalesRepository>(SalesRepository);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('POST SUCCESS CreateSale should return a sale', async () => {
    const expectedResult: Sale = {
      id: '1',
      createdDate: new Date().toUTCString(),
      ...createSaleDto,
    };

    jest.spyOn(repository, 'create').mockReturnValue(expectedResult as any);
    jest.spyOn(repository, 'save').mockResolvedValue(expectedResult as any);

    const result = await repository.CreateSale(createSaleDto);

    expect(repository.create).toHaveBeenCalledWith({ ...createSaleDto });
    expect(repository.save).toHaveBeenCalledWith(expectedResult);
    expect(result).toEqual(expectedResult);
  });
});
