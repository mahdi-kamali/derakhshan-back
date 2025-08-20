import { AppRouter } from "@src/base/AppRouter";
import FileModel, { IFile } from "@src/models/file/File.model";
import GalleryModel, {
  IAddImage,
  IGallery,
} from "@src/models/gallery/Gallery.model";

const ImageRouter = new AppRouter();

// List
ImageRouter.GET<any, IFile[]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const images = await FileModel.find();
    return images;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "عکس ها باموفقیت دریافت شد",
      status: "OK",
    };
  },
});

// Add Image
ImageRouter.POST<IAddImage, IFile[]>({
  path: "/",
  multer: {
    directory: "gallery",
    fields: [
      {
        name: "images",
        count: 10,
      },
    ],
  },
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const { images, gallery_id } = data;

    if (!images)
      onError({
        data: "images الزامی است",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    const gallery = await GalleryModel.findById(gallery_id.trim());

    if (gallery === null)
      onError({
        data: "گالری وجود ندارد.",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    return data.images;
  },
  async onFinish(request, data, callBacks, utils) {
    const { gallery_id } = request;

    const images = await Promise.all(
      data.map(async (image) => {
        const newImage = new FileModel(image);
        return await newImage.save();
      }),
    );

    const gallery = await GalleryModel.findById(gallery_id);

    await gallery?.updateOne({
      $push: { images: images },
    });

    return {
      data: images,
      message: "عکس به گالری اضافه شد.",
      status: "CREATED",
    };
  },
});

ImageRouter.DELETE<
  {
    gallery_id: IGallery["_id"];
    _id: IFile["_id"];
  },
  void
>({
  path: "/",
  async onStart(data, { onError }, utils) {
    const { _id, gallery_id } = data;

    if (!_id)
      throw onError({
        data: "_id الزامی است",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });
    if (!gallery_id)
      throw onError({
        data: "gallery_id الزامی است",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });
  },
  async onProccess(data, { onError }, utils) {},
  async onFinish(request, data, { onError }, utils) {
    const { _id, gallery_id } = request;

    const gallery = await GalleryModel.findById(gallery_id);

    if (gallery === null)
      throw onError({
        data: "گالری پیدا نشد",
        message: "خطایی رخ داده است",
        status: "NOT_FOUND",
      });

    await GalleryModel.updateOne({
      $pull: {
        images: { _id },
      },
    });

    return {
      data: undefined,
      message: "عکس از گالری حذف شد.",
      status: "OK",
    };
  },
});

export default ImageRouter.getRouter();
