import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';

@Injectable()
export class AdvertisementService {
  getStats(createAdvertisementDto: CreateAdvertisementDto) {
    console.log(createAdvertisementDto);

    return 'This action adds a new advertisement';
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
