import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/wb_ads_db'),
    MongooseModule.forRoot(
      'mongodb://user:123@mongo:27017/wb_ads_db?authSource=admin',
    ),
    AdvertisementModule,
  ],
})
export class AppModule {}
