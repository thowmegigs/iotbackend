import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
import { UUID } from 'crypto';
  import {
    Document
  } from 'mongoose';
import { Role } from 'src/entities/role.entity';
import { Plan } from './plan.schema';

  
  export type UserDocument = User & Document;
  
  @Schema()
  export class User {
   

    @Prop({
        required: true,maxlength:300
      })
    name: string;
  
    @Prop({
        required: true,
        email:true
      })
    email: string;
  
    @Prop({
        required: true
      })
    phone: string;
    @Prop({
        required: true
      })
    password: string;
    @Prop({
        required: true
      })
    role: string;
    @Prop()
    alternate_phone?: string|null;
  
    @Prop()
    address: string;
  
    @Prop()
    company_name?: string|null;
  
    @Prop()
    company_address?: string|null;
    @Prop()
    plan?: Plan;
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);