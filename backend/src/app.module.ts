import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      isGlobal: true,
    }),
    // MongooseModule.forRoot('mongodb://mongodb:27017/wb_ads_db'),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER || 'user'}:${process.env.MONGO_PASSWORD || '123'}@mongo:27017/wb_ads_db?authSource=admin`,
    ),
    AdvertisementModule,
  ],
})
export class AppModule {}
