import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";
import { IProduct, ProductSchema } from "../product/Product.model";

export interface ICategory {
  title: string;
  en_title: string;
  image: IFile;
  products: IProduct[];
  _id?: mongoose.ObjectId;
  description: string;
  en_description: string;
}

const CategoryModel = new mongoose.Schema<ICategory>(
  {
    image: {
      type: FileSchema,
      required: [true, "عکس الزامی است"],
      ref: "File",
    },
    title: {
      type: String,
      required: [true, "عنوان الزامی است"],
    },
    en_title: {
      type: String,
      required: [true, "عنوان (لاتین) الزامی است"],
    },
    products: {
      type: [ProductSchema],
      required: [true, "محصولات دسته بندی الزامی است"],
      ref: "Products",
    },
    description: {
      type: String,
      required: [true, "توضیحات مورد نیاز است"],
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

export default mongoose.model<ICategory>("Category", CategoryModel);
