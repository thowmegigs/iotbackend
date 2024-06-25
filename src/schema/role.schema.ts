import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
import { UUID } from 'crypto';
  import {
    Document
  } from 'mongoose';
import { PermissionEnum } from 'src/entities/role.entity';

  
  export type RoleDocument = Role & Document;
  
  @Schema()
  export class Role {
   

    @Prop({
        required: true,maxlength:50
      })
    name: string;
  
    @Prop({
        required: true,
        
      })
    permissions: PermissionEnum[];
  
    
  }
  
  export const RoleSchema = SchemaFactory.createForClass(Role);