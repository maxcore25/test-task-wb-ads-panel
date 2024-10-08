import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @IsNumber()
  @ApiProperty()
  advert: number;

  @ApiProperty()
  date: string;
}
