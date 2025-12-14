import { AppRouter } from "@src/base/AppRouter";
import { IDeleteOrder, IGetOrder, IPostOrder } from "./order.types";
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

OrderRouter.GET<IGetOrder["REQUEST"], IGetOrder["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {
    console.log(data);
  },
  async onProccess(data, callBacks, utils) {
    const orders = await OrderModel.find();
    return await orders;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست سفارشات با موفقیت دریافت شد",
      status: "CREATED",
    };
  },
});

OrderRouter.DELETE<IDeleteOrder["REQUEST"], IDeleteOrder["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const order = await OrderModel.findById(data._id);

    if (order === null) {
      onError({
        data: "سفارش پیدا نشد",
        status: "NOT_FOUND",
      });
    }
  },
  async onProccess(data, callBacks, utils) {
    const order = await OrderModel.findByIdAndDelete(data._id, { new: true });
    return order!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "سفارش با موفقیت حذف شد",
      status: "CREATED",
    };
  },
});

export default OrderRouter.getRouter();
