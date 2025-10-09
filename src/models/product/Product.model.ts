import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

export interface IProduct {
  _id?: string;
  title: string;
  en_title: string;
  image: IFile;
  gallery: IFile[];
  description: string;
  en_description: string;
}

export const ProductSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "عنوان الزامی است"],
    },
    en_title: {
      type: String,
      required: [true, "عنوان (لاتین) الزامی است"],
    },
    gallery: {
      type: [FileSchema],
      required: [true, "گالری عکس الزامی است"],
      ref: "Files",
    },
    image: {
      type: FileSchema,
      required: [true, "عکس اصلی الزامی است"],
    },
    description: {
      type: String,
      required: [true, "توضیحات الزامی است"],
    },
    en_description: {
      type: String,
      required: [true, "توضیحات (لاتین) الزامی است"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProduct>("Product", ProductSchema);
