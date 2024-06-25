import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { PlanModule } from './plan/plan.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
@Module({
  imports: [AuthModule,PlanModule,RoleModule,UserModule, MongooseModule.forRoot('mongodb+srv://throwmegigs:5ZaXw0HFljXaVZBk@cluster0.ekovorn.mongodb.net/iot_db?retryWrites=true&w=majority&appName=iotproject')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
