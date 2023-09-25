import {
  BadRequestException,
  Injectable,
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
    try {
      const cars = await this.carModel.find().exec();

      return cars;
    } catch (error) {
      Logger.error('get all cars function!');
      throw new NotFoundException(error);
    }
  }

  async getById(id: string): Promise<Car> {
    try {
      const car: Car = await this.carModel.findById(id);
      if (!car) {
        throw new BadRequestException('ID not exist!');
      }
      return car;
    } catch (error) {
      Logger.error('get car by ID function!');
      throw error;
    }
  }

  async createCar(createCarDto: CarDto): Promise<Car> {
    try {
      const createdCar = new this.carModel(createCarDto);
      createdCar.save();
      return createdCar;
    } catch (error) {
      Logger.error('create car function', error);
      throw new NotFoundException(error);
    }
  }

  async deleteCar(id: string) {
    try {
      await this.carModel.findByIdAndRemove(id);
      Logger.warn(`The car with ${id} this id was deleted!`);
      return;
    } catch (error) {
      Logger.error('Delete car function!!!');
      throw new NotFoundException(error);
    }
  }
}
