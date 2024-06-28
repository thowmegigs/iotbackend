import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
import { UUID } from 'crypto';
  import {
    Document
  } from 'mongoose';

import type { Permission } from 'src/entities/role.entity';

 
  
  export type RoleDocument = Role & Document;
  
  @Schema()
  export class Role {
   

    @Prop({
        required: true,maxlength:50
      })
    name: string;
  
    @Prop({
        required: true,type:Object
        
      })
    permissions: Permission;
  
    
  }
  
  export const RoleSchema = SchemaFactory.createForClass(Role);