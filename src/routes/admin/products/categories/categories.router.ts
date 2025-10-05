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

categoriesRouter.POST<ICreateCategory["REQUEST"], ICreateCategory["RESPONSE"]>({
  path: "/",
  multer: {
    directory: "categories",
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
  async onProccess(data, callBacks, utils) {
    const category = new CategoryModel(data);

    return await category.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "دسته بندی با موفقیت ایجاد شد",
      status: "CREATED",
    };
  },
});

categoriesRouter.PUT<IUpdateCategory["REQUEST"], IUpdateCategory["RESPONSE"]>({
  path: "/:_id",
  multer: {
    directory: "categories",
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

    const category = await CategoryModel.findByIdAndUpdate(_id, data, {
      new: true,
    });

    if (category === undefined || category === null)
      onError({
        data: "دسته بندی پیدا نشد",
        status: "NOT_FOUND",
      });

    return category!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "دسته بندی با موفقیت آپدیت شد",
      status: "OK",
    };
  },
});

categoriesRouter.DELETE<
  IDeleteCategory["REQUEST"],
  IDeleteCategory["RESPONSE"]
>({
  path: "/:id",
  multer: {
    directory: "categories",
    fields: [
      {
        count: 1,
        name: "image",
      },
    ],
  },
  async onStart(data, { onError }, utils) {},
  async onProccess(data, { onError }, utils) {
    const category = await CategoryModel.findByIdAndDelete(data.id);
    if (category === undefined || category === null)
      onError({
        data: "دسته بندی پیدا نشد",
        status: "NOT_FOUND",
      });
    return category!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "دسته بندی با موفقیت حذف شد",
      status: "CREATED",
    };
  },
});

export default categoriesRouter.getRouter();
