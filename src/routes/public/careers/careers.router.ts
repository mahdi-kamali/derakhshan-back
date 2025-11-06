import { AppRouter } from "@src/base/AppRouter";
import CareerSchema from "@src/models/career/Career.model";
import { IGetCareer } from "@src/routes/admin/careers/careers.types";
import CareerApplyRouter from "./apply/CareerApply.router";

const CareersRouter = new AppRouter();

CareersRouter.use("/apply", CareerApplyRouter);

CareersRouter.GET<IGetCareer["REQUEST"], IGetCareer["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const careers = await CareerSchema.find();
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
