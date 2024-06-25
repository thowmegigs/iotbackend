import {
    BadRequestException,
    Injectable
} from '@nestjs/common';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    Model
} from 'mongoose';
import { CreatePlanDto } from 'src/dto/plan/create-plan.dto';
import { UpdatePlanDto } from 'src/dto/plan/update-plan.dto';
import { Plan } from 'src/entities/plan.entity';


import { HashService } from 'src/hash.service';
import { transformDocument } from 'src/helper';
import { PlanDocument } from 'src/schema/plan.schema';

@Injectable()
export class PlanService {

    constructor(@InjectModel(Plan.name) private readonly planModel: Model<Plan>) { }

    async create(createPlanDto: CreatePlanDto): Promise<PlanDocument> {

        const createPlan = new this.planModel(createPlanDto);
       
        return createPlan.save();

    }

    async getPlanByName(name: String): Promise<PlanDocument> {
        return this.planModel.findOne({ name })
            .exec();
    }
    private transformPlan(plan: any | null): Plan {
        const { _id, __v, ...userDto } = plan.toObject();
      let   userDto1={...userDto,id:_id}
        return userDto1 as Plan;
    }
    async findAll(): Promise<Plan[]> {
        let r=await this.planModel.find()
        .exec();
        return r.map(user => this.transformPlan(user));
    }

    async findOne(id: any) {
        return this.planModel.findById(id);
    }

    async update(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanDocument> {

        

        return this.planModel.findByIdAndUpdate(id, updatePlanDto);
    }

    async remove(id: string) {
        return this.planModel.findByIdAndDelete(id);
    }

}