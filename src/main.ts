import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Header-Version',
  });
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
