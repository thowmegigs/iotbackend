import { ObjectId } from "mongoose";



export type permRecordType={create:boolean,edit:boolean,delete:boolean,owned:boolean}
export interface Permission {
  [key: string]: permRecordType
}
export enum Status{
  Active= "active" ,
  InActvie="in-active",
  Blocked="blocked"
}

export class Role {
  id:ObjectId;
    name: string;
    permissions:Permission
   
  }