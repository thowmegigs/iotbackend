import {
  Module
} from '@nestjs/common';
import {
  RoleService
} from './role.service';
import {
  RoleController
} from './role.controller';
import {
  Role,
  RoleSchema
} from '../schema/role.schema';
import {
  MongooseModule
} from '@nestjs/mongoose';
import { HashService } from 'src/hash.service';

@Module({
  imports: [
   MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema
      },
   ])
  ],
  exports:[RoleService],
  controllers: [RoleController],
  providers: [RoleService,HashService]
})
export class RoleModule {}