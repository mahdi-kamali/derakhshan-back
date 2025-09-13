import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

export interface ICategory {
  title: string;
  image: IFile;
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICategory>("Category", CategoryModel);
