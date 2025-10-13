import { ISection, ISectionCU } from "@src/models/section/Sections.model";
import { IPage } from "@src/models/page/Page.model";

export interface IGetSections {
  REQUEST: {};
  RESPONSE: ISection[];
}

export interface IUpdateSection {
  REQUEST: {
    _id: IPage;
    _section_id: ISection["_id"];
  };
  RESPONSE: ISection;
}

export interface ICreateSection {
  REQUEST: {
    // page_id: IPage["id"];
    type: string;
    isActive: boolean;
    name: string;
    page: string;
    components: any;
  };
  RESPONSE: ISection;
}

export interface IDeleteSection {
  REQUEST: {
    _id: ISection["_id"];
  };
  RESPONSE: ISection;
}
