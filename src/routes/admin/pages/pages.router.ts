import { AppRouter } from "@src/base/AppRouter";
import PagesModel, { IPage, IPageCU } from "@src/models/page/Page.model";
import SectionsRouter from "./sections/sections.router";
import { ICreatPage, IGetPages, IUpdatePage } from "./pages.type";
import PagesMiddleWares from "./pages.middlewares";

const PagesRouter = new AppRouter();

// Contents
PagesRouter.use("/:_id/sections", SectionsRouter);

// List
PagesRouter.GET<IGetPages["REQUEST"], IGetPages["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const pages = await PagesModel.find().populate("sections");
    return pages;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "صفحات با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Create
PagesRouter.POST<ICreatPage["REQUEST"], ICreatPage["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const newPage = new PagesModel(data);
    return await newPage.save();
  },
  async onFinish(request, data, { onError }, { jwt }) {
    return {
      data: data,
      message: "صفحات با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Update
PagesRouter.PUT<IUpdatePage["REQUEST"], IUpdatePage["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const { _id } = data;
    const page = await PagesModel.findById(_id);
    if (page === null)
      onError({
        data: "صفحه مورد نظر پیدا نشد.",
        message: "خطایی رخ داده است",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id } = data;
    const page = await PagesModel.findByIdAndUpdate(_id, data, { new: true });

    await page?.save();
    return page!!;
  },
  async onFinish(request, data, { onError }, { jwt }) {
    return {
      data: data,
      message: "صفحات با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Delete
PagesRouter.DELETE<IUpdatePage["REQUEST"], IUpdatePage["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const { _id } = data;

    const page = await PagesModel.findById(_id);

    if (page === null)
      onError({
        data: "صفحه مورد نظر پیدا نشد.",
        message: "خطایی رخ داده است",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id } = data;
    const page = await PagesModel.findByIdAndDelete(_id, { new: true });

    return await page!!;
  },
  async onFinish(request, data, { onError }, { jwt }) {
    return {
      data: data,
      message: "صفحات با موفقیت حذف شد.",
      status: "ACCEPTED",
    };
  },
});

export default PagesRouter.getRouter();
