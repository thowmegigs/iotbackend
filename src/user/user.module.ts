import {
    Module
  } from '@nestjs/common';
  import {
    UserService
  } from './user.service';
  import {
    UserController
  } from './user.controller';
  import {
    User,
    UserSchema
  } from '../schema/user.schema';
  import {
    MongooseModule
  } from '@nestjs/mongoose';
import { HashService } from 'src/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { PlanModule } from 'src/plan/plan.module';
import { PlanService } from 'src/plan/plan.service';

  
  @Module({
    imports: [
      PlanModule,
     MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        },
     ]),
     JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d'
      },
    }),
    ],
    controllers: [UserController],
    exports:[UserService],
    providers: [UserService,AuthService,HashService,LocalStrategy]
  })
  export class UserModule {}