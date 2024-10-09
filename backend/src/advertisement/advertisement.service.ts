import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import axios from 'axios';

@Injectable()
export class AdvertisementService {
  async getStats(createAdvertisementDto: CreateAdvertisementDto) {
    console.log(createAdvertisementDto);

    const res = await axios.post(
      'https://app.marketspace.ru/testing-api/adv/v2/fullstats',
      [
        {
          id: createAdvertisementDto.advert,
          dates: [createAdvertisementDto.date],
        },
      ],
    );

    console.log(res.data);

    // return 'This action adds a new advertisement';
    return res.data;
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
