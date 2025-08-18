import { AppRouter } from "@src/base/AppRouter";
import GalleryModel, {
  IGallery,
  IGalleryCU,
} from "@src/models/gallery/Gallery.model";
import imageRouter from "./image/image.router";

const GalleryRouter = new AppRouter();

GalleryRouter.GET<any, IGallery[]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const galleries = await GalleryModel.find();
    return await galleries;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست گالری با موفقیت دریافت شد.",
      status: "OK",
    };
  },
});

GalleryRouter.POST<IGalleryCU, IGallery>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const gallery = new GalleryModel(data);
    return await gallery.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "گالری با موفقیت ایجاد شد.",
      status: "CREATED",
    };
  },
});

GalleryRouter.PUT<IGallery, IGallery>({
  path: "/:_id",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const gallery = await GalleryModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    if (gallery === null) {
      onError({
        data: "گالری وجود ندارد",
        message: "خطایی راخ داده است",
        status: "BAD_REQUEST",
      });
    }

    return gallery!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "گالری با موفقیت ویرایش شد.",
      status: "OK",
    };
  },
});

GalleryRouter.DELETE<IGallery, IGallery>({
  path: "/:_id",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const gallery = await GalleryModel.findByIdAndDelete(data._id, {
      new: true,
    });

    if (gallery === null) {
      onError({
        data: "گالری وجود ندارد",
        message: "خطایی راخ داده است",
        status: "BAD_REQUEST",
      });
    }

    return gallery!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "گالری با موفقیت حذف شد.",
      status: "OK",
    };
  },
});

GalleryRouter.use("/images", imageRouter);

export default GalleryRouter.getRouter();
