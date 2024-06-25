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
    CreateUserDto
} from '../dto/user/create-user.dto';
import {
    UpdateUserDto
} from '../dto/user/update-user.dto';
import {
    User,
    UserDocument
} from '../schema/user.schema';
import { HashService } from 'src/hash.service';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/entities/role.entity';
import { PlanService } from 'src/plan/plan.service';
import { Plan } from 'src/entities/plan.entity';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
     private hashService: HashService, 
    // private roleService:RoleService,
     private planService:PlanService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {

        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const user = await this.getUserByEmail(createUser.email);
        if (user) {
            throw new BadRequestException("User Already Exist");
        }
    //    let roled=await this.roleService.getRoleByName(createUserDto.role.name);
    // let roleObj:Role={
    //     id:roled._id as string,
    //     name:roled.name,
    //     permissions:roled.permissions
    // }
    //createUser.role=roleObj;
        createUser.password = await this.hashService.hashPassword(createUser.password);

        return createUser.save();

    }

    async getUserByEmail(email: String): Promise<UserDocument|null> {
        return this.userModel.findOne({ email })
            .exec();
    }
    private transformRole(role: any | null): Role {
        const { _id, __v, ...userDto } = role;
      let   userDto1={...userDto,id:_id}
        return userDto1 as Role;
    }
    private transformUser(user: any | null): User {
        const { _id, __v,password, ...userDto } = user.toObject();
    //   let   userDto1={...userDto,id:_id,role:this.transformRole(userDto.role)}
    let   userDto1={...userDto,id:_id}
        return userDto1 as User;
    }
    async findAll(): Promise<User[]> {
        let r=await this.userModel.find()
        .exec();
        return r.map(user => this.transformUser(user));
    }

    async findOne(id: string) {
        return this.userModel.findById(id);
    }

    async update(id: any, updateUserDto: UpdateUserDto): Promise<UserDocument> {
      
        
        //createUser.role=roleObj;
        if (updateUserDto.password)
            updateUserDto.password = await this.hashService.hashPassword(updateUserDto.password);


        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    }

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

}