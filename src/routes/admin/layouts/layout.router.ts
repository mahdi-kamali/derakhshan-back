import { AppRouter } from "@src/base/AppRouter";

const LayoutRouter = new AppRouter();

LayoutRouter.POST<any, any>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {},
  async onFinish(request, data, callBacks, utils) {
    return {
      data: "",
      message: "",
      status: "ACCEPTED",
    };
  },
});

export default LayoutRouter.getRouter();
