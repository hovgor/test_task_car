import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from '../cars.controller';
import { CarsService } from '../cars.service';

describe('CarsController', () => {
  let controller: CarsController;
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of cars', async () => {
    const cars: any = [{ brand: 'Mercedes' }, { brand: 'Jeep' }];
    jest.spyOn(service, 'getAllCars').mockResolvedValue(cars);

    expect(await controller.getAllCars()).toBe(cars);
  });
});
