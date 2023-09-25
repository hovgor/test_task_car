import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Schema, Document } from 'mongoose';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export interface Car extends Document {
  brand: string;
  model: string;
  year: number;
  price: number;
}

export const CarSchema = new Schema({
  brand: String,
  model: String,
  year: Number,
  price: Number,
});

export const CarModel = mongoose.model<Car>('Car', CarSchema);

export class CarDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(1886)
  @Max(2024)
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
