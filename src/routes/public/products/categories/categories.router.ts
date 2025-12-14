import { AppRouter } from "@src/base/AppRouter";
import {
  ICreateCategory,
  IDeleteCategory,
  IGetCategory,
  IGetCateogires,
  IUpdateCategory,
} from "./categories.types";
import CategoryModel from "@src/models/category/Category.model";

const categoriesRouter = new AppRouter();

categoriesRouter.GET<IGetCateogires["REQUEST"], IGetCateogires["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const categories = await CategoryModel.find();
    return categories;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست دسته بندی ها با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

categoriesRouter.GET<IGetCategory["REQUEST"], IGetCategory["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const cateogry = await CategoryModel.findById(data._id);
    if (cateogry === null) {
      onError({
        data: "دسته بندی پیدا نشد",
        status: "NOT_FOUND",
      });
    }
  },
  async onProccess(data, callBacks, utils) {
    const cateogry = await CategoryModel.findById(data._id);
    return cateogry!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: " دسته بندی با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

export default categoriesRouter.getRouter();
