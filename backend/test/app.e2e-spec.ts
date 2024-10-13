import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AdvertisementController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/ads (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/ads')
      .send({ advert: 19447497, date: '2024-10-10' })
      .expect(201);
  });

  it('/api/ads (GET)', () => {
    return request(app.getHttpServer()).get('/api/ads').expect(200);
  });

  it('/api/ads/1 (GET)', () => {
    return request(app.getHttpServer()).get('/api/ads/1').expect(200);
  });

  it('/api/ads/1 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/api/ads/1')
      .send({ advert: 19447497, date: '2024-10-10' })
      .expect(200);
  });

  it('/api/ads/1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/api/ads/1').expect(200);
  });
});
