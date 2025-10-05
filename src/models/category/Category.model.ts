import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";
import { IProduct, ProductSchema } from "../product/Product.model";

export interface ICategory {
  title: string;
  image: IFile;
  products: IProduct[];
  _id?: mongoose.ObjectId;
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
    products: {
      type: [ProductSchema],
      required: [true, "محصولات دسته بندی الزامی است"],
      ref: "Products",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICategory>("Category", CategoryModel);
