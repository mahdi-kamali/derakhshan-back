import { AppRouter } from "@src/base/AppRouter";
import PageModel, { IPage } from "@src/models/page/Page.model";
import {
  ICreateSection,
  IDeleteSection,
  IGetSection,
  IUpdateSection,
} from "./sections.types";
import SectionsModel from "@src/models/section/Sections.model";

const SectionsRouter = new AppRouter();

// List
SectionsRouter.GET<IGetSection["REQUEST"], IGetSection["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {
    const { _id } = data;

    const page = await PageModel.findById(_id);
    if (page === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "صفحه مورد نظر پیدا نشد",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id } = data;
    const sections = await PageModel.findById(_id).populate("sections");
    return sections!!.sections;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "محتویات این صفحه با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Update
SectionsRouter.PUT<IUpdateSection["REQUEST"], IUpdateSection["RESPONSE"]>({
  path: "/:_section_id",
  async onStart(data, { onError }, utils) {
    const { _id, _section_id } = data;

    const page = await PageModel.findById(_id);
    if (page === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "صفحه مورد نظر پیدا نشد",
      });

    const section = await SectionsModel.findById(_section_id);
    if (section === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "سیکشن مورد نظر پیدا نشد",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _section_id } = data;

    const section = await SectionsModel.findByIdAndUpdate(
      _section_id,
      {
        ...data,
        _id: _section_id,
      },
      {
        new: true,
      },
    );

    return section!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "محتویات این صفحه با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Create
SectionsRouter.POST<ICreateSection["REQUEST"], ICreateSection["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {
    const { _id } = data;

    const page = await PageModel.findById(_id);
    if (page === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "صفحه مورد نظر پیدا نشد",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id } = data;

    const newSection = new SectionsModel({
      ...data,
      _id: undefined,
    });

    await newSection.save();

    const page = await PageModel.findByIdAndUpdate(_id, {
      $push: {
        sections: newSection._id,
      },
    });

    return page!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "محتویات این صفحه با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Delete
SectionsRouter.DELETE<IDeleteSection["REQUEST"], IDeleteSection["RESPONSE"]>({
  path: "/:_section_id",
  async onStart(data, { onError }, utils) {
    const { _id, _section_id } = data;

    const page = await PageModel.findById(_id);
    if (page === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "صفحه مورد نظر پیدا نشد",
      });

    const section = await SectionsModel.findById(_section_id);

    if (section === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "سکشن مورد نظر پیدا نشد.",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id, _section_id } = data;

    // const page = await PageModel.findByIdAndUpdate(
    //   _id,
    //   {
    //     $pull: {
    //       sections: _section_id,
    //     },
    //   },
    //   { new: true },
    // );

    const Section = await SectionsModel.findByIdAndDelete(_section_id, {
      new: true,
    });

    return Section!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "سکشن با موفقیت اضافه شد.",
      status: "ACCEPTED",
    };
  },
});

export default SectionsRouter.getRouter();
