import { IPage } from "@src/models/page/Page.model";

export interface IGetPages {
  REQUEST: {};
  RESPONSE: IPage[];
}

export interface ICreatPage {
  REQUEST: {
    title: string;
    slug: string;
    sections: string;
    metaTitle?: string;
    metaDescription?: string;
    status: "draft" | "published" | "stopped";
  };
  RESPONSE: IPage;
}

export interface IUpdatePage {
  REQUEST: {
    _id: IPage["_id"];
    title: string;
    slug: string;
    sections: string;
    metaTitle?: string;
    metaDescription?: string;
    status: "draft" | "published" | "stopped";
  };
  RESPONSE: IPage;
}

export interface IDeletePage {
  REQUEST: {
    _id: IPage["_id"];
  };
  RESPONSE: IPage;
}
