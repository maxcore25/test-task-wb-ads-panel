import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';

@ApiTags('Ads')
@Controller('ads')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  @ApiOperation({ summary: 'Получить рекламную кампанию по номеру РК и дате' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Advertisement,
  })
  getStats(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementService.getStats(createAdvertisementDto);
  }

  // @Post()
  // create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
  //   return this.advertisementService.create(createAdvertisementDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Получить все рекламные кампании' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [Advertisement],
  })
  findAll() {
    return this.advertisementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить рекламную кампанию по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Advertisement,
  })
  findOne(@Param('id') id: string) {
    return this.advertisementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить рекламную кампанию по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Advertisement,
  })
  update(
    @Param('id') id: string,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить рекламную кампанию по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Advertisement,
  })
  remove(@Param('id') id: string) {
    return this.advertisementService.remove(id);
  }
}
