import mongoose from "mongoose";
import { IFile, FileSchema } from "../file/File.model";

export interface IGallery {
  _id: string;
  title: string;
  images: IFile[];
}

export interface IGalleryCU {
  title: string;
}

export interface IAddImage {
  gallery_id: IGallery["_id"];
  images: IFile[];
}

export interface IRemoveImage {
  gallery_id: IGallery["_id"];
  image_id: string;
}

const GalleryModel = new mongoose.Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, "اسم گالری الزامی است"],
    },
    images: {
      type: [FileSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Gallery", GalleryModel);
