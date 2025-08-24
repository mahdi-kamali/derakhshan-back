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
    const { _id, sections } = data;

    const page = await PageModel.findByIdAndUpdate(
      _id,
      {
        sections: sections,
      },
      {
        new: true,
      },
    );

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
    const { _id, section } = data;

    const newSection = new SectionsModel(section);

    await newSection.save();

    const page = await PageModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          sections: newSection._id,
        },
      },
      {
        new: true,
      },
    );

    return page?.save()!!;
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

    const page = await PageModel.findByIdAndUpdate(
      _id,
      {
        $pull: {
          sections: _section_id,
        },
      },
      { new: true },
    );

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

export default SectionsRouter.getRouter();
