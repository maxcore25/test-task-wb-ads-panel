import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdvertisementDocument = HydratedDocument<Advertisement>;

@Schema()
export class Advertisement {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
