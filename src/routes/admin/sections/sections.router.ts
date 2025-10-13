import { AppRouter } from "@src/base/AppRouter";
import PageModel, { IPage } from "@src/models/page/Page.model";

import SectionsModel from "@src/models/section/Sections.model";
import {
  ICreateSection,
  IDeleteSection,
  IGetSections,
  IUpdateSection,
} from "./sections.types";

const SectionsRouter = new AppRouter();

// List
SectionsRouter.GET<IGetSections["REQUEST"], IGetSections["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const sections = await SectionsModel.find();
    return sections!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "سکشن ها با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Create
SectionsRouter.POST<ICreateSection["REQUEST"], ICreateSection["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {},
  async onProccess(data, callBacks, utils) {
    const newSection = new SectionsModel(data);
    await newSection.save();
    return newSection;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: " سکشن با موفقیت ایجاد شد.",
      status: "ACCEPTED",
    };
  },
});

// Update
SectionsRouter.PUT<IUpdateSection["REQUEST"], IUpdateSection["RESPONSE"]>({
  path: "/:_section_id",
  async onStart(data, { onError }, utils) {
    const { _id, _section_id } = data;

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
      message: "سکشن با موفقیت ویرایش شد.",
      status: "ACCEPTED",
    };
  },
});

// Delete
SectionsRouter.DELETE<IDeleteSection["REQUEST"], IDeleteSection["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const { _id } = data;
    const section = await SectionsModel.findById(_id);
    if (section === null)
      onError({
        data: "error",
        status: "NOT_FOUND",
        message: "سکشن مورد نظر پیدا نشد.",
      });
  },
  async onProccess(data, callBacks, utils) {
    const { _id } = data;

    const Section = await SectionsModel.findByIdAndDelete(_id, {
      new: true,
    });

    const page = await PageModel.findOneAndUpdate(
      { sections: _id }, // find a page containing this section
      { $pull: { sections: _id } }, // remove the section from array
      { new: true }, // return the updated document
    );

    return Section!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "سکشن با موفقیت حذف شد.",
      status: "ACCEPTED",
    };
  },
});

export default SectionsRouter.getRouter();
