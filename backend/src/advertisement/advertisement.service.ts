import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisement } from './entities/advertisement.entity';
import { Model } from 'mongoose';
import { testAdvFullstats } from 'src/temp';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
  ) {}

  async getStats(createAdvertisementDto: CreateAdvertisementDto) {
    try {
      // const res = await axios.post(
      //   'https://app.marketspace.ru/testing-api/adv/v2/fullstats',
      //   [
      //     {
      //       id: createAdvertisementDto.advert,
      //       dates: [createAdvertisementDto.date],
      //     },
      //   ],
      // );

      // const createdAdvertisement = new this.advertisementModel(res.data);
      // createdAdvertisement.save();

      // console.log(res.data);
      // return res.data;

      const nms = testAdvFullstats[0].days[0].apps.map((app) => ({
        nmId: app.nm[0].nmId,
        clicks: app.clicks,
        cpc: app.cpc,
        ctr: app.ctr,
      }));

      const createdAdvertisement = new this.advertisementModel({
        summary: {
          clicks: testAdvFullstats[0].clicks,
          cpc: testAdvFullstats[0].cpc,
          ctr: testAdvFullstats[0].ctr,
        },
        list: nms,
      });
      return createdAdvertisement.save();
    } catch (error) {
      console.log('Error:', error);
      return { error };
    }
  }

  // create(createAdvertisementDto: CreateAdvertisementDto) {
  //   return 'This action adds a new advertisement';
  // }

  async findAll() {
    try {
      const advertisements = await this.advertisementModel.find({});
      console.log(advertisements);
      return advertisements;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  }

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
