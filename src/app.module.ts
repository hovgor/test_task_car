import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [CarsModule, MongooseModule.forRoot(process.env.MONGO_DB)],
})
export class AppModule {}
