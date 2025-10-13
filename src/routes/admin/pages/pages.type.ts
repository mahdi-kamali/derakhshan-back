import { IPage } from "@src/models/page/Page.model";
import { ISection } from "@src/models/section/Sections.model";

export interface IGetPages {
  REQUEST: {};
  RESPONSE: IPage[];
}

export interface IGetPageByID {
  REQUEST: {
    _id: IPage["id"];
  };
  RESPONSE: IPage;
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

export interface IAddSectionToPage {
  REQUEST: {
    _id: IPage["_id"];
    section_id: ISection["_id"];
  };
  RESPONSE: {};
}

export interface IDeletePage {
  REQUEST: {
    _id: IPage["_id"];
  };
  RESPONSE: IPage;
}
