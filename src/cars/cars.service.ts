import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDto } from './repository/cars.model';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async getAllCars(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async getById(id: string): Promise<Car> {
    const car: Car = await this.carModel.findById(id);
    if (!car) {
      throw new NotFoundException('Car was not found');
    }
    return car;
  }

  async createCar(createCarDto: CarDto): Promise<void> {
    try {
      const createdCar = new this.carModel(createCarDto);
      await createdCar.save();
    } catch (error) {
      Logger.error('create car function', error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteCar(id: string): Promise<void> {
    try {
      await this.carModel.findByIdAndRemove(id);
    } catch (error) {
      Logger.error('Delete car function', error);
      throw new InternalServerErrorException(error);
    }
  }
}
