import { AppRouter } from "@src/base/AppRouter";
import LayoutsModel, {
  ILayout,
  ILayoutCU,
} from "@src/models/layouts/Layouts.model";

const LayoutRouter = new AppRouter();

// List
LayoutRouter.GET<any, ILayout[]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const layouts = await LayoutsModel.find();
    return layouts;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لایه بندی با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Create
LayoutRouter.POST<ILayoutCU, ILayout>({
  path: "/",
  async onStart(data) {},
  async onProccess(data) {
    const layout = new LayoutsModel(data);
    return await layout.save();
  },
  async onFinish(request, data) {
    return {
      data: data,
      message: "لایه بندی با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

// Update
LayoutRouter.PUT<ILayout, ILayout>({
  path: "/:_id",
  async onStart(data) {},
  async onProccess(data, { onError }) {
    await LayoutsModel.findByIdAndUpdate(data._id, data, { new: true });

    const layout = await LayoutsModel.findById(data._id);

    if (layout === null)
      onError({
        data: "لایه بندی پیدا نشد",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    return await layout!!;
  },
  async onFinish(request, data) {
    return {
      data: data,
      message: "لایه بندی با موفقیت دریافت شد.",
      status: "ACCEPTED",
    };
  },
});

export default LayoutRouter.getRouter();
