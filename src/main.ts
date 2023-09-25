import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useSwagger } from './swagger/swagger';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './error-handling/http-exception.filter';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );
  useSwagger(app);
  await app.listen(process.env.PORT);
  Logger.log(`server listning http://${process.env.HOST}:${process.env.PORT}`);
}
bootstrap();
