import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @IsNumber()
  @ApiProperty({
    default: 19447497,
    examples: [19447497, 18854755],
  })
  advert: number;

  @ApiProperty({
    default: '2024-10-08',
    example: '2024-10-08',
  })
  date: string;
}
