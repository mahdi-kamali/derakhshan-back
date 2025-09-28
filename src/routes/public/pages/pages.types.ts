import { IFile } from "@src/models/file/File.model";
import { IPage } from "@src/models/page/Page.model";

export interface IGetPages {
  REQUEST: any;
  RESPONSE: IPage[];
}

export interface IGetPageBySlug {
  REQUEST: {
    slug: string;
  };
  RESPONSE: IPage;
}
