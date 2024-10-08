import { IsNumber } from 'class-validator';

export class CreateAdvertisementDto {
  @IsNumber()
  advert: number;

  date: string;
}
