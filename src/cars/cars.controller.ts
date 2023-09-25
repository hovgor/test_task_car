import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car, CarDto } from './repository/cars.model';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateIdExistsPipe } from 'src/pipes/id.validation.pipe';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOkResponse({
    description: 'This endpoint to find all the cars.',
  })
  @Get()
  async getAllCars(): Promise<Car[]> {
    return this.carsService.getAllCars();
  }

  @ApiOkResponse({
    description: 'This endpoint to find car by id.',
  })
  @UsePipes(ValidateIdExistsPipe)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Car> {
    return this.carsService.getById(id);
  }

  @ApiCreatedResponse({
    description: 'This endpoint to create a new car.',
  })
  @Post('create')
  async createCar(@Body() createCarDto: CarDto) {
    return await this.carsService.createCar(createCarDto);
  }

  @ApiNoContentResponse({
    description: 'This endpoint is for deleting a car.',
  })
  @UsePipes(ValidateIdExistsPipe)
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<void> {
    return this.carsService.deleteCar(id);
  }
}
