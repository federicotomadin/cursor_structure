import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './common/filters/error.filter';

export const API_PREFIX = 'api';

export function setupApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new ErrorFilter());
}
