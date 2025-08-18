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

export interface IGalleryImage {
  gallery_id: IGallery["_id"];
  image: IFile;
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
