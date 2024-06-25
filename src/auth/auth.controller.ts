import {
    AuthService
  } from './auth.service';
  import {
    Controller,
    Request,
    UseGuards,
    Post,
    Body,
    HttpException
  } from '@nestjs/common';
  import {
    AuthGuard
  } from '@nestjs/passport';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
   
    @Post(`/login`)
    async login(@Body() req) {
        console.log(req.email,req.password)
       let user=await this.authService.validateUser(req.email,req.password)
      
    
       if(user){
       let g=await this.authService.login(user)
     
       return {success:true,message:"ok",data:g}
       }
      else 
       throw new HttpException('Invalid Login credentials',500);
               
       
      
    }
  }