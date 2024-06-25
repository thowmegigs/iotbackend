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
import {
    CreateRoleDto
} from '../dto/role/create-role.dto';
import {
    UpdateRoleDto
} from '../dto/role/update-role.dto';
import {
    Role,
    RoleDocument
} from '../schema/role.schema';
import { HashService } from 'src/hash.service';
import { transformDocument } from 'src/helper';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) { }

    async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {

        const createRole = new this.roleModel(createRoleDto);
       
        return createRole.save();

    }

    async getRoleByName(name: String): Promise<RoleDocument> {
        return this.roleModel.findOne({ name })
            .exec();
    }
    private transformRole(role: any | null): Role {
        const { _id, __v, ...userDto } = role.toObject();
      let   userDto1={...userDto,id:_id}
        return userDto1 as Role;
    }
    async findAll(): Promise<Role[]> {
        let r=await this.roleModel.find()
        .exec();
        return r.map(user => this.transformRole(user));
    }

    async findOne(id: string) {
        return this.roleModel.findById(id);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDocument> {

        

        return this.roleModel.findByIdAndUpdate(id, updateRoleDto);
    }

    async remove(id: string) {
        return this.roleModel.findByIdAndDelete(id);
    }

}