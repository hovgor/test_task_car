import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from 'src/cars/repository/cars.model';
import { CustomException } from 'src/error-handling/custom-exception';

@Injectable()
export class ValidateIdExistsPipe implements PipeTransform<string> {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async transform(value: string): Promise<string> {
    if (!Types.ObjectId.isValid(value)) {
      throw new CustomException('Invalid ID format.');
    }
    const entity = await this.carModel.findById(value).exec();

    if (!entity) {
      throw new BadRequestException(
        'The document with the specified identifier was not found',
      );
    }

    return value;
  }
}
