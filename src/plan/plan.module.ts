import {
  Module
} from '@nestjs/common';
import {
  PlanService
} from './plan.service';
import {
  PlanController
} from './plan.controller';

import {
  MongooseModule
} from '@nestjs/mongoose';
import { HashService } from 'src/hash.service';
import { PlanSchema } from 'src/schema/plan.schema';
import { Plan } from 'src/entities/plan.entity';

@Module({
  imports: [
   MongooseModule.forFeature([
      {
        name: Plan.name,
        schema: PlanSchema
      },
   ])
  ],
  exports:[PlanService],
  controllers: [PlanController],
  providers: [PlanService]
})
export class PlanModule {}