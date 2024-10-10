import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisement } from './entities/advertisement.entity';
import { Model } from 'mongoose';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
// import { testAdvFullstats } from 'src/temp';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
  ) {}

  async getStats(createAdvertisementDto: CreateAdvertisementDto) {
    const existingAdvertisement = await this.advertisementModel
      .findOne(createAdvertisementDto)
      .exec();

    if (existingAdvertisement) {
      return existingAdvertisement;
    }

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

      const nms = res.data[0].days[0].apps.map((app) => ({
        nmId: app.nm[0].nmId,
        clicks: app.clicks,
        cpc: app.cpc,
        ctr: app.ctr,
      }));

      const newAdvertisement = new this.advertisementModel({
        advert: createAdvertisementDto.advert,
        date: createAdvertisementDto.date,
        summary: {
          clicks: res.data[0].clicks,
          cpc: res.data[0].cpc,
          ctr: res.data[0].ctr,
        },
        list: nms,
      });

      return await newAdvertisement.save();
    } catch (error) {
      console.log('Error:', error);
      return { error };
    }
  }

  async findAll() {
    return await this.advertisementModel.find().exec();
  }

  async findOne(id: string) {
    return await this.advertisementModel.findById(id).exec();
  }

  async update(id: string, updateAdvertisementDto: UpdateAdvertisementDto) {
    return await this.advertisementModel
      .findByIdAndUpdate(id, updateAdvertisementDto)
      .exec();
  }

  async remove(id: string) {
    return await this.advertisementModel.findByIdAndDelete(id).exec();
  }
}
