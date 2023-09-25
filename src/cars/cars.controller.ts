import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car, CarDto } from './repository/cars.model';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ValidateIdExistsPipe } from 'src/decorators/id.validation.pipe';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOkResponse({
    description: 'This endpoint to find all the cars.',
  })
  @Get()
  async getAllCars(@Res() res: Response) {
    const cars: Car[] = await this.carsService.getAllCars();
    return res
      .status(HttpStatus.OK)
      .json({ data: cars, message: 'All cars!', error: false });
  }

  @ApiOkResponse({
    description: 'This endpoint to find car by id.',
  })
  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const car: Car = await this.carsService.getById(id);
    return res
      .status(HttpStatus.OK)
      .json({ data: car, message: 'Car!', error: false });
  }

  @ApiCreatedResponse({
    description: 'This endpoint to create a new car.',
  })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createCar(@Body() createCarDto: CarDto, @Res() res: Response) {
    const car: Car = await this.carsService.createCar(createCarDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ data: car, message: 'A new car was created!', error: false });
  }

  @ApiNoContentResponse({
    description: 'This endpoint is for deleting a car.',
  })
  @UsePipes(ValidateIdExistsPipe)
  @Delete(':id')
  async deleteCar(@Param('id') id: string, @Res() res: Response) {
    await this.carsService.deleteCar(id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
