import { IUser } from "@src/models/user/User.model";

export interface IGetUsers {
  REQUEST: any;
  RESPONSE: IUser[];
}

export interface IGetUser {
  REQUEST: {
    _id: IUser["_id"];
  };
  RESPONSE: IUser;
}

export interface IPostUser {
  REQUEST: IUser;
  RESPONSE: IUser;
}

export interface IPutUser {
  REQUEST: IUser;
  RESPONSE: IUser;
}
