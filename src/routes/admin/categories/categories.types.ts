import { ICategory } from "@src/models/category/Category.model";
import { IFile } from "@src/models/file/File.model";

export interface ICreateCategory {
  REQUEST: {
    image: IFile;
    title: string;
    products: any[];
  };
  RESPONSE: ICategory;
}

export interface IUpdateCategory {
  REQUEST: {
    image: IFile;
    title: string;
    products: any[];
    id: ICategory["_id"];
  };
  RESPONSE: ICategory;
}

export interface IGetCategory {
  REQUEST: any;
  RESPONSE: ICategory[];
}

export interface IDeleteCategory {
  REQUEST: {
    id: ICategory["_id"];
  };
  RESPONSE: ICategory;
}
