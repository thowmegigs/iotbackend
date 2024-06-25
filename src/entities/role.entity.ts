import { ObjectId } from "mongoose";



export enum PermissionEnum {
  CreateUser='CreateUser',
  UpdateUser='UpdateUser',
}

export enum Status{
  Active= "active" ,
  InActvie="in-active",
  Blocked="blocked"
}

export class Role {
  id:ObjectId;
    name: string;
    permissions:PermissionEnum[]
   
  }