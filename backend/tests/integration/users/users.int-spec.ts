import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../support/create-test-app';

describe('Users API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /api/users creates a user and GET /api/users/:id returns it', async () => {
    const created = await request(app.getHttpServer())
      .post('/api/users')
      .send({ name: 'Ada', email: 'ada@example.com' })
      .expect(201);

    await request(app.getHttpServer())
      .get(`/api/users/${created.body.id}`)
      .expect(200)
      .expect(({ body }) => expect(body).toMatchObject({ name: 'Ada', email: 'ada@example.com' }));
  });

  it('POST /api/users returns 400 for an invalid payload', async () => {
    await request(app.getHttpServer()).post('/api/users').send({ name: 'A' }).expect(400);
  });

  it('POST /api/users returns 409 when the email already exists', async () => {
    const payload = { name: 'Ada', email: 'ada@example.com' };
    await request(app.getHttpServer()).post('/api/users').send(payload).expect(201);
    await request(app.getHttpServer()).post('/api/users').send(payload).expect(409);
  });

  it('GET /api/users/:id returns 404 for an unknown user', async () => {
    await request(app.getHttpServer())
      .get('/api/users/7f1c6a2e-3b1f-4c55-9a39-2f6f0d1e8b11')
      .expect(404);
  });
});
