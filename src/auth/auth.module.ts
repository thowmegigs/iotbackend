import {
    Module,
    forwardRef
  } from '@nestjs/common';
  import {
    AuthService
  } from './auth.service';
  import {
    AuthController
  } from './auth.controller';
  import {
    MongooseModule
  } from '@nestjs/mongoose';

  import {
    JwtModule
  } from '@nestjs/jwt';

  import {
    HashService
  } from '../hash.service';
  import {
    LocalStrategy
  } from 'src/strategy/local.strategy';
import { User } from 'src/entities/user.entity';
import { UserSchema } from 'src/schema/user.schema';
import { jwtConstants } from 'src/constants';
import { UserService } from 'src/user/user.service';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

  
  @Module({
    imports: [UserModule,
     MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    controllers: [AuthController],
    exports:[AuthService],
    providers: [AuthService, LocalStrategy, HashService],
  })
  export class AuthModule {}