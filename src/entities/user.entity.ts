import { ObjectId } from "mongoose";
import { Plan } from "./plan.entity";
import { Role } from "./role.entity";


export enum Status{
  Active= "active" ,
  InActvie="in-active",
  Blocked="blocked"
}

export class User {
  id:ObjectId;
    name: string;
    email: string;
    phone: string;
    password:string;
    alternate_phone?: string|null;
    address?: string|null;
    role:string;
    status?:Status;
    company_name?: string|null;
    company_address?: string|null;
    plan?:Plan|null
  }