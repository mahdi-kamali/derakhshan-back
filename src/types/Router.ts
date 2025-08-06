import { IFile } from "@src/models/file/File.model";
import { StatusCodes } from "http-status-codes";
import { Document, Model, Mongoose } from "mongoose";

export interface IResponseMessage<RES = any> {
  message: string;
  data: RES;
  status: keyof typeof StatusCodes;
}

export interface IError {
  message: string;
  data: any;
  status: keyof typeof StatusCodes;
}

export interface ICallBacks {
  onError: (err: IError) => void;
}

export interface IUtills {
  jwt: {
    encode: (data: any) => string;
    decode: (data: any) => any;
  };
}

export type IMethodProps<REQ = any, RES = any> = {
  path: string;
  onStart: (data: REQ, callBacks: ICallBacks, utils: IUtills) => Promise<void>;
  multer?: {
    directory: string;
    fields: {
      name: string;
      count: number;
    }[];
  };
  onProccess: (
    data: REQ,
    callBacks: ICallBacks,
    utils: IUtills,
  ) => Promise<RES>;
  onFinish: (
    request: REQ,
    data: RES,
    callBacks: ICallBacks,
    utils: IUtills,
  ) => Promise<IResponseMessage<RES>>;
};
