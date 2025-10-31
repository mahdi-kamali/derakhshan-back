import { ICareer } from "@src/models/career/Career.model";

export interface ICreateCareer {
  REQUEST: ICareer;
  RESPONSE: ICareer;
}

export interface IUpdateCareer {
  REQUEST: ICareer;
  RESPONSE: ICareer;
}

export interface IUpdateCareer {
  REQUEST: ICareer;
  RESPONSE: ICareer;
}

export interface IGetCareer {
  REQUEST: any;
  RESPONSE: ICareer[];
}

export interface IGetCareerByID {
  REQUEST: ICareer["_id"];
  RESPONSE: ICareer;
}

export interface IDeleteCareer {
  REQUEST: {
    _id: ICareer["_id"];
  };
  RESPONSE: ICareer;
}
