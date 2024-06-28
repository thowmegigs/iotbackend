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
        private roleService: RoleService,
        private planService: PlanService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {

        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const user = await this.getUserByEmail(createUser.email);
        if (user) {
            throw new BadRequestException("User Already Exist");
        }

        createUser.password = await this.hashService.hashPassword(createUser.password);

        return createUser.save();

    }

    async getUserByEmail(email: String): Promise<any | null> {
        let u = await this.userModel.findOne({ email }).exec()

        if (u) {
            let u1 = { ...u.toObject() as any }
            
            let role = u1.role;
            let roleInfo = await this.roleService.getRoleByName(role);
            if (roleInfo) {
                let perm = roleInfo['permissions']
                delete perm['_id']
                roleInfo['permissions'] = { ...perm }

                delete u1.role;
                u1.role = roleInfo;
            }
            
            return u1
        }

        return u
    }

    private async transformUser(user: any | null, is_for_multi_row: boolean = false): Promise<User> {
        const { _id, __v, password, ...userDto } = user.toObject();

        let userDto1 = { ...userDto, id: _id }
        if (!is_for_multi_row) {
            let u1 = { ...userDto as any }
            let role = u1.role;
            if (role !== undefined) {
                let roleInfo = await this.roleService.getRoleByName(role);

                let perm = roleInfo['permissions']
                delete perm['_id']
                roleInfo['permissions'] = { ...perm }

                delete u1.role;
                u1.role = roleInfo;
                console.log('findny email2', u1)
            }
            return u1;

        }
        return userDto1 as User;
    }
    async findAll(): Promise<User[]> {
        let r = await this.userModel.find()
            .exec();


        const promises = r.map((user) => this.transformUser(user, true));

        // // Wait for all promises to resolve
        const results = await Promise.all(promises);
        return results
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