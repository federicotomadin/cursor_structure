import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { loadAppConfig } from '@app/infrastructure';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap(): Promise<void> {
  const config = loadAppConfig();
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  app.enableCors({ origin: config.corsOrigin });
  await app.listen(config.port);
}

void bootstrap();
