import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Advertisement,
  AdvertisementSchema,
} from './entities/advertisement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertisement.name, schema: AdvertisementSchema },
    ]),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
