import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/cars/repository/cars.model';

@Injectable()
export class ValidateIdExistsPipe implements PipeTransform<string> {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async transform(value: string): Promise<string> {
    const entity = await this.carModel.findById(value).exec();

    if (!entity) {
      throw new BadRequestException(
        'The document with the specified identifier was not found',
      );
    }

    return value;
  }
}
