import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AdvertisementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
