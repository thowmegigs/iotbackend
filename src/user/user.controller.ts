import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Patch
  } from '@nestjs/common';
  import {
    UserService
  } from './user.service';
  import {
    CreateUserDto
  } from '../dto/user/create-user.dto';
  import {
    UpdateUserDto
  } from '../dto/user/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

  
  @Controller('api/users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Param() param):any {
      return this.userService.getUserByEmail(param.email);
    }
    @Get()
    findAll() {
        console.log('ddgdgfd')
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(id);
    }
  }