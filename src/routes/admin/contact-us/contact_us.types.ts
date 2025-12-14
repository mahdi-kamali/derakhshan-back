import { IContactUs } from "@src/models/contact-us/ContactUs.model";

export interface IGetContactUs {
  REQUEST: any;
  RESPONSE: IContactUs[];
}


export interface IPutContactUs {
  REQUEST: IContactUs;
  RESPONSE: IContactUs;
}
