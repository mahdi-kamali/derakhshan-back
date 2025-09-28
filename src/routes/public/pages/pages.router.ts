import { AppRouter } from "@src/base/AppRouter";
import { IGetPageBySlug, IGetPages } from "./pages.types";
import PageModel from "@src/models/page/Page.model";

const PagesRouter = new AppRouter();

PagesRouter.GET<IGetPages["REQUEST"], IGetPages["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const pages = await PageModel.find().populate("sections");
    return pages;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست صفحات با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

PagesRouter.GET<IGetPageBySlug["REQUEST"], IGetPageBySlug["RESPONSE"]>({
  path: "/slug/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const page = await PageModel.findOne({
      slug: data.slug,
    }).populate("sections");

    if (page === null)
      onError({
        data: "صفحه مورد نظر پیدا نشد",
        status: "NOT_FOUND",
      });
    return page!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست صفحات با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

export default PagesRouter.getRouter();
