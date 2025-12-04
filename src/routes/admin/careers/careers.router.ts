import { AppRouter } from "@src/base/AppRouter";
import {
  ICreateCareer,
  IDeleteCareer,
  IGetCareer,
  IGetCareerByID,
  IUpdateCareer,
} from "./careers.types";
import CareerModel from "@src/models/career/Career.model";
import SectionsModel from "@src/models/section/Sections.model";
import ApplysRouter from "./applys/applys.router";

const CareersRouter = new AppRouter();

CareersRouter.use("/applys", ApplysRouter);

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

CareersRouter.GET<IGetCareerByID["REQUEST"], IGetCareerByID["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const career = await CareerModel.findById(data);
    if (career === null)
      onError({
        data: "آگهی پیدا نشد.",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, callBacks, utils) {
    const career = await CareerModel.findById(data);
    return career!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: " اگهی ها با موفقیت دریافت شد.",
      status: "OK",
    };
  },
});

CareersRouter.POST<ICreateCareer["REQUEST"], ICreateCareer["RESPONSE"]>({
  path: "/",
  multer: {
    directory: "careers",
    fields: [
      {
        count: 1,
        name: "FA.image",
      },
      {
        count: 1,
        name: "EN.image",
      },
    ],
  },
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const career = new CareerModel(data);
    return await career.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "آگهی با موفقیت ایجاد شد",
      status: "CREATED",
    };
  },
});

CareersRouter.DELETE<IDeleteCareer["REQUEST"], IDeleteCareer["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const { _id } = data;
    const career = await CareerModel.findByIdAndDelete(_id, { new: true });
    SectionsModel.find({});
    if (career === null) {
      onError({
        data: "آگهی پیدا نشد",
        status: "NOT_FOUND",
      });
    }
    return career!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "آگهی با موفقیت ایجاد شد",
      status: "CREATED",
    };
  },
});

CareersRouter.PUT<IUpdateCareer["REQUEST"], IUpdateCareer["RESPONSE"]>({
  path: "/:_id",
  multer: {
    directory: "careers",
    fields: [
      {
        count: 1,
        name: "image",
      },
    ],
  },
  async onStart(data, { onError }, utils) {
    const career = await CareerModel.findById(data._id);
    if (career === null) {
      onError({
        data: "آگهی پیدا نشد",
        status: "NOT_FOUND",
      });
    }
  },
  async onProccess(data, callBacks, utils) {
    const career = await CareerModel.findByIdAndUpdate(
      data._id,
      {
        ...data,
        _id: undefined,
      },
      {
        new: true,
      },
    );
    return career!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "آگهی با موفقیت ویرایش شد",
      status: "CREATED",
    };
  },
});

export default CareersRouter.getRouter();
