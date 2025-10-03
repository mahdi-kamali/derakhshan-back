import { AppRouter } from "@src/base/AppRouter";
import { IGetOrder, IPostOrder } from "./order.types";
import OrderModel from "@src/models/order/Order.model";

const OrderRouter = new AppRouter();

OrderRouter.POST<IPostOrder["REQUEST"], IPostOrder["RESPONSE"]>({
  path: "/",
  multer: {
    directory: "orders",
    fields: [
      {
        count: 1,
        name: "product.image",
      },
    ],
  },
  async onStart(data, callBacks, utils) {
    console.log(data);
  },
  async onProccess(data, callBacks, utils) {
    const order = new OrderModel(data);
    return await order.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message:
        "سفارش شما با موفقیت ثبت شد, در اسرع وقت با شما تماس خواهیم گرفت",
      status: "CREATED",
    };
  },
});

export default OrderRouter.getRouter();
