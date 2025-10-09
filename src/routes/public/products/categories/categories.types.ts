import { ICategory } from "@src/models/category/Category.model";
import { IFile } from "@src/models/file/File.model";
import { IProduct } from "@src/models/product/Product.model";

export interface ICreateCategory {
  REQUEST: {
    image: IFile;
    title: string;
    products: IProduct[];
  };
  RESPONSE: ICategory;
}

export interface IUpdateCategory {
  REQUEST: ICategory;
  RESPONSE: ICategory;
}

export interface IGetCateogires {
  REQUEST: any;
  RESPONSE: ICategory[];
}

export interface IGetCategory {
  REQUEST: {
    _id: ICategory["_id"];
  };
  RESPONSE: ICategory;
}

export interface IDeleteCategory {
  REQUEST: {
    id: ICategory["_id"];
  };
  RESPONSE: ICategory;
}
