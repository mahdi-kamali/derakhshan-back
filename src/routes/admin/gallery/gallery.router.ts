import { AppRouter } from "@src/base/AppRouter";
import FileModel, { IFile } from "@src/models/file/File.model";
import GalleryModel, {
  IGallery,
  IGalleryCU,
  IGalleryImage,
} from "@src/models/gallery/Gallery.model";

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

GalleryRouter.POST<IGalleryImage, IFile>({
  path: "/:_id/images/",
  multer: {
    directory: "admin/gallery",
    fields: [
      {
        name: "image",
        count: 1,
      },
    ],
  },
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const { image, _id } = data;
    if (!image)
      onError({
        data: "image الزامی است",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    const gallery = await GalleryModel.findById(_id);
    if (gallery === null)
      onError({
        data: "گالری وجود ندارد.",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    return data.image;
  },
  async onFinish(request, data, callBacks, utils) {
    const { _id } = request;

    const newImage = new FileModel(data);
    await newImage.save();
    const gallery = await GalleryModel.findById(_id);

    await gallery?.updateOne({
      $push: { images: newImage },
    });

    return {
      data: newImage,
      message: "عکس به گالری اضافه شد.",
      status: "CREATED",
    };
  },
});

export default GalleryRouter.getRouter();
