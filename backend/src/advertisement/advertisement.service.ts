import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisement } from './entities/advertisement.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
  ) {}

  async getStats(createAdvertisementDto: CreateAdvertisementDto) {
    try {
      const res = await axios.post(
        'https://app.marketspace.ru/testing-api/adv/v2/fullstats',
        [
          {
            id: createAdvertisementDto.advert,
            dates: [createAdvertisementDto.date],
          },
        ],
      );

      const createdAdvertisement = new this.advertisementModel(res.data);
      createdAdvertisement.save();

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log('Error:', error);
      return { error };
    }
  }

  // create(createAdvertisementDto: CreateAdvertisementDto) {
  //   return 'This action adds a new advertisement';
  // }

  // findAll() {
  //   return `This action returns all advertisement`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} advertisement`;
  // }

  // update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
  //   return `This action updates a #${id} advertisement`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} advertisement`;
  // }
}
