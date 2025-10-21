import { AppRouter } from "@src/base/AppRouter";
import CareerModel from "@src/models/career/Career.model";
import { IGetCareer } from "@src/routes/admin/careers/careers.types";

const CareersRouter = new AppRouter();

CareersRouter.GET<IGetCareer["REQUEST"], IGetCareer["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const careers = await CareerModel.find();
    return careers;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست اگهی ها با موفقیت دریافت شد.",
      status: "OK",
    };
  },
});
export default CareersRouter.getRouter();
