import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AdvertisementDocument = HydratedDocument<Advertisement>;

export class Metrics {
  @Prop()
  @ApiProperty()
  clicks: number;

  @Prop()
  @ApiProperty()
  ctr: number;

  @Prop()
  @ApiProperty()
  cpc: number;
}

@Schema()
export class Summary extends Metrics {}

@Schema()
export class List extends Metrics {
  @Prop()
  @ApiProperty()
  nmId: number;
}

@Schema()
export class Advertisement {
  @Prop()
  @ApiProperty()
  advert: number;

  @Prop()
  @ApiProperty()
  date: string;

  @Prop({ type: Summary })
  @ApiProperty({ type: () => Summary })
  summary: Summary;

  @Prop({ type: [List] })
  @ApiProperty({ type: [List] })
  list: List[];
}

export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
