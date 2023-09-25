import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from '../cars.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('CarsService', () => {
  let service: CarsService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getModelToken('Car'),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    model = module.get<Model<any>>(getModelToken('Car'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of cars', async () => {
    const cars: any = [{ brand: 'Volga' }, { brand: 'Lada' }];
    const findMock: any = {
      exec: jest.fn().mockResolvedValue(cars),
    };
    jest.spyOn(model, 'find').mockReturnValue(findMock);

    const result = await service.getAllCars();
    expect(result).toEqual(cars);
  });
});
