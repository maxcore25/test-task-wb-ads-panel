import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    AdvertisementModule,
  ],
})
export class AppModule {}
