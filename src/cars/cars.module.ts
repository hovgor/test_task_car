import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './repository/cars.model';
import { ValidateIdExistsPipe } from 'src/pipes/id.validation.pipe';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarsService, ValidateIdExistsPipe],
})
export class CarsModule {}
