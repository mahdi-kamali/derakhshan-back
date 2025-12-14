import { AppRouter } from "@src/base/AppRouter";
import SectionsSchema, {
  ISection,
  ISectionCU,
} from "@src/models/section/Sections.model";

const LayoutRouter = new AppRouter();

// List
LayoutRouter.GET<any, ISection[]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const layouts = await SectionsSchema.find();
    return layouts;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "سکشن با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Create
LayoutRouter.POST<ISectionCU, ISection>({
  path: "/",
  async onStart(data) {},
  async onProccess(data) {
    const layout = new SectionsSchema(data);
    return await layout.save();
  },
  async onFinish(request, data) {
    return {
      data: data,
      message: "سکشن با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Update
LayoutRouter.PUT<ISection, ISection>({
  path: "/:_id",
  async onStart(data) {},
  async onProccess(data, { onError }) {
    await SectionsSchema.findByIdAndUpdate(data._id, data, { new: true });

    const layout = await SectionsSchema.findById(data._id);

    if (layout === null)
      onError({
        data: "سکشن پیدا نشد",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    return await layout!!;
  },
  async onFinish(request, data) {
    return {
      data: data,
      message: "سکشن با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

export default LayoutRouter.getRouter();
