import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdvertisementDocument = HydratedDocument<Advertisement>;

@Schema()
export class Summary {
  @Prop()
  clicks: number;

  @Prop()
  ctr: number;

  @Prop()
  cpc: number;
}

@Schema()
export class List {
  @Prop()
  nmId: number;

  @Prop()
  clicks: number;

  @Prop()
  ctr: number;

  @Prop()
  cpc: number;
}

@Schema()
export class Advertisement {
  @Prop()
  advert: number;

  @Prop()
  date: string;

  @Prop({ type: Summary })
  summary: Summary;

  @Prop({ type: [List] })
  list: List[];
}

export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
