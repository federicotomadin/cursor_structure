import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule, setupApp } from '@app/presentation';

export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = moduleRef.createNestApplication();
  setupApp(app);
  await app.init();
  return app;
}
