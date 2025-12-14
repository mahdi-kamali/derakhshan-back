import { IOrder } from "@src/models/order/Order.model";
import { IPage } from "@src/models/page/Page.model";

export interface IPostOrder {
  REQUEST: IOrder;
  RESPONSE: IOrder;
}

export interface IGetOrder {
  REQUEST: any;
  RESPONSE: IOrder[];
}

export interface IDeleteOrder {
  REQUEST: {
    _id : IOrder["id"]
  };
  RESPONSE: IOrder;
}

