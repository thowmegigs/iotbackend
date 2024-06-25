import {
    UserService
  } from '../user/user.service';
  import {
    Injectable
  } from '@nestjs/common';
  import {
    JwtService
  } from '@nestjs/jwt';
  import {
    HashService
  } from '../hash.service';

import { excludeKey } from 'src/helper';
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService,
      private hashService: HashService,
     
      private jwtService: JwtService) {}
  
    async validateUser(email: string, pass: string): Promise < any > {
      const user = await this.userService.getUserByEmail(email);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {

        return user;
      }
      return null;
    }
  
    async login(user: any):Promise<any> {

      const payload = {
        username: user.email,
        sub: user._id
      };
   
      return {
        user:{email:user.email,phone:user.phone,role:user.role,name:user.name},
        access_token: this.jwtService.sign(payload),
      };
    }
  }