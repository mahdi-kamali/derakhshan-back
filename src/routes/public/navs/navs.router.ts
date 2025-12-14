import { AppRouter } from "@src/base/AppRouter";
import { IGetNavs } from "./router.types";
import PageModel from "@src/models/page/Page.model";

const NavsRouter = new AppRouter();

NavsRouter.GET<IGetNavs["REQUEST"], IGetNavs["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const pages = await PageModel.find({
      "nav.show": true,
    });
    return pages;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست nav دریافت شد.",
      status: "OK",
    };
  },
});

export default NavsRouter.getRouter();
