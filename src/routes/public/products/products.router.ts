import { AppRouter } from "@src/base/AppRouter";
import {
  ICreateProduct,
  IDeleteProduct,
  IGetByIdProduct,
  IGetProduct,
  IUpdateProduct,
} from "./products.types";
import ProductModel from "@src/models/product/Product.model";
import categoriesRouter from "./categories/categories.router";

const productsRouter = new AppRouter();

productsRouter.use("/categories", categoriesRouter);

productsRouter.GET<IGetProduct["REQUEST"], IGetProduct["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const products = await ProductModel.find();
    return products;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست محصولات با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

productsRouter.GET<IGetByIdProduct["REQUEST"], IGetByIdProduct["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, { onError }, utils) {
    const { _id } = data;

    const product = await ProductModel.findById(_id);

    if (product === undefined || product === null)
      onError({
        data: "محصول پیدا نشد",
        status: "NOT_FOUND",
      });

    return product!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "محصول با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

export default productsRouter.getRouter();
