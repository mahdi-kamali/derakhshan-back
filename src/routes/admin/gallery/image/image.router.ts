import { AppRouter } from "@src/base/AppRouter";
import { BASE_DIR, STORAGE_PATH } from "@src/common/constants/Paths";
import FileModel, { IFile } from "@src/models/file/File.model";
import GalleryModel, {
  IAddImage,
  IGallery,
} from "@src/models/gallery/Gallery.model";
import { IDeleteImage, IPostAddImage } from "./image.types";

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
ImageRouter.POST<IPostAddImage["REQUEST"], IPostAddImage["RESPONSE"]>({
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

    return data;
  },
  async onFinish(request, data, callBacks, utils) {
    const { gallery_id } = request;

    request.images;
    const images = await Promise.all(
      request.images.map(async (image) => {
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

// Delete Image
ImageRouter.DELETE<IDeleteImage["REQUEST"], IDeleteImage["RESPONSE"]>({
  path: "/",
  async onStart(data, { onError }, utils) {
    const { _id, gallery_id } = data;
    const image = await FileModel.findById(_id);
    if (image === null) {
      onError({
        data: "عکس مورد نظر پیدا نشد",
        status: "NOT_FOUND",
      });
    }
    const gallery = await GalleryModel.findById(gallery_id);
    if (gallery === null)
      throw onError({
        data: "گالری پیدا نشد",
        message: "خطایی رخ داده است",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, { onError }, { fileSystem }) {
    return data;
  },
  async onFinish(request, data, { onError }, { fileSystem }) {
    const { _id, gallery_id } = request;

    const image = await FileModel.findById(_id);
    await GalleryModel.updateOne({
      $pull: {
        images: { _id },
      },
    });
    fileSystem.deleteFile({
      path: image!!.path,
      onFail(error) {},
      async onSuccess() {},
    });

    return {
      data: image,
      status: "OK",
      message: "عکس با موفقیت حذف شد.",
    };
  },
});

export default ImageRouter.getRouter();
