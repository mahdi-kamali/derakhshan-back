import { ISection, ISectionCU } from "@src/models/section/Sections.model";
import { IPage } from "@src/models/page/Page.model";

export interface IGetSection {
  REQUEST: {
    _id: IPage;
  };
  RESPONSE: IPage["sections"];
}

export interface IUpdateSection {
  REQUEST: {
    _id: IPage;
    sections: ISection[];
  };
  RESPONSE: IPage;
}

export interface ICreateSection {
  REQUEST: {
    _id: IPage["_id"];
    section: ISectionCU;
  };
  RESPONSE: IPage;
}

export interface IDeleteSection {
  REQUEST: {
    _id: IPage["_id"];
    _section_id: ISection["_id"];
  };
  RESPONSE: IPage;
}
