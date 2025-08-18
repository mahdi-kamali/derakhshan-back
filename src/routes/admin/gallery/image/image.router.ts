import { AppRouter } from "@src/base/AppRouter";
import FileModel, { IFile } from "@src/models/file/File.model";
import GalleryModel, { IGalleryImage } from "@src/models/gallery/Gallery.model";

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
ImageRouter.POST<IGalleryImage, IFile>({
  path: "/",
  multer: {
    directory: "gallery",
    fields: [
      {
        name: "image",
        count: 1,
      },
    ],
  },
  async onStart(data, callBacks, utils) {},
  async onProccess(data, { onError }, utils) {
    const { image, gallery_id } = data;
    if (!image)
      onError({
        data: "image الزامی است",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    const gallery = await GalleryModel.findById(gallery_id);
    if (gallery === null)
      onError({
        data: "گالری وجود ندارد.",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    return data.image;
  },
  async onFinish(request, data, callBacks, utils) {
    const { gallery_id } = request;

    const newImage = new FileModel(data);
    await newImage.save();
    const gallery = await GalleryModel.findById(gallery_id);

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

export default ImageRouter.getRouter();
