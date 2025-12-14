import { IFile } from "@src/models/file/File.model";
import { IProduct } from "@src/models/product/Product.model";

export interface ICreateProduct {
  REQUEST: {
    image: IFile;
    title: string;
    products: IProduct[];
  };
  RESPONSE: IProduct;
}

export interface IUpdateProduct {
  REQUEST: IProduct;
  RESPONSE: IProduct;
}

export interface IGetByIdProduct {
  REQUEST: {
    _id: IProduct["_id"];
  };
  RESPONSE: IProduct;
}

export interface IGetProduct {
  REQUEST: any;
  RESPONSE: IProduct[];
}

export interface IDeleteProduct {
  REQUEST: {
    _id: IProduct["_id"];
  };
  RESPONSE: IProduct;
}
