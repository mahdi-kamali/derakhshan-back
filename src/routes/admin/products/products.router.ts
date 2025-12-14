import { AppRouter } from "@src/base/AppRouter";
import {
  ICreateProduct,
  IDeleteProduct,
  IGetByIdProduct,
  IGetProduct,
  IUpdateProduct,
} from "./products.types";
import CategoryModel from "@src/models/category/Category.model";
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

productsRouter.POST<ICreateProduct["REQUEST"], ICreateProduct["RESPONSE"]>({
  path: "/",
  multer: {
    directory: "products",
    fields: [
      {
        count: 1,
        name: "image",
      },
      {
        count: 5,
        name: "gallery",
      },
    ],
  },
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const product = new ProductModel(data);
    return await product.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "محصول با موفقیت ایجاد شد",
      status: "CREATED",
    };
  },
});

productsRouter.PUT<IUpdateProduct["REQUEST"], IUpdateProduct["RESPONSE"]>({
  path: "/:_id",
  multer: {
    directory: "products",
    fields: [
      {
        count: 1,
        name: "image",
      },
    ],
  },
  async onStart(data, { onError }, utils) {
    const { image } = data;
    if (!image)
      onError({
        data: "عکس الزامی است",
        status: "BAD_REQUEST",
      });
  },
  async onProccess(data, { onError }, utils) {
    const { _id } = data;

    const product = await ProductModel.findByIdAndUpdate(_id, data, {
      new: true,
    });

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
      message: "محصول با موفقیت آپدیت شد",
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

productsRouter.DELETE<IDeleteProduct["REQUEST"], IDeleteProduct["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, { onError }, utils) {
    const product = await ProductModel.findByIdAndDelete(data._id);
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
      message: "محصول با موفقیت حذف شد.",
      status: "CREATED",
    };
  },
});

export default productsRouter.getRouter();
