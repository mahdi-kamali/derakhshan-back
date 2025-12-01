import { AppRouter } from "@src/base/AppRouter";
import CareerApplyModel from "@src/models/career/applys/CareerApply.model";

const ApplysRouter = new AppRouter();

ApplysRouter.GET({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const applys = CareerApplyModel.find();
    return applys;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست رزومه ها دریافت شد",
      status: "OK",
    };
  },
});

ApplysRouter.getRouter();
