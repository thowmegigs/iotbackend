import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { UUID } from 'crypto';
import {
  Document
} from 'mongoose';



export type PlanDocument = Plan & Document;

@Schema()
export class Plan {
 

  @Prop({
      required: true,maxlength:50
    })
  name: string;

  @Prop({
      required: true,
      
    })
  limit: number;

  
}

export const PlanSchema = SchemaFactory.createForClass(Plan);