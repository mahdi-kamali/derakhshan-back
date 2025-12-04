import { AppRouter } from "@src/base/AppRouter";
import { IPostCarrerApply } from "../../../admin/careers/careers.types";
import ApplysModel from "@src/models/career/applys/CareerApply.model";
import CareerModel from "@src/models/career/Career.model";

const CareerApply = new AppRouter();

CareerApply.POST<IPostCarrerApply["REQUEST"], IPostCarrerApply["RESPONSE"]>({
  path: "/:career_id",
  multer: {
    directory: "careers/applys",
    fields: [
      {
        count: 1,
        name: "uploads.resume",
      },
      {
        count: 1,
        name: "uploads.organizationImage",
      },
    ],
  },
  async onStart(data, { onError }, utils) {
    const career = await CareerModel.findById(data.career_id);

    if (career === null) {
      onError({
        data: "آگهی پیدا نشد",
        status: "NOT_FOUND",
      });
    }
  },
  async onProccess(data, callBacks, utils) {
    const apply = new ApplysModel(data);
    return await apply.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message:
        "درخواست شما با موفقیت ثبت شد, در اولین فرصت با شما تماس خواهیم گرفت",
      status: "CREATED",
    };
  },
});

export default CareerApply.getRouter();
