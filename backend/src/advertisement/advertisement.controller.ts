import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@ApiTags('Ads')
@Controller('ads')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  getStats(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementService.getStats(createAdvertisementDto);
  }

  // @Post()
  // create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
  //   return this.advertisementService.create(createAdvertisementDto);
  // }

  @Get()
  findAll() {
    return this.advertisementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisementService.remove(id);
  }
}
