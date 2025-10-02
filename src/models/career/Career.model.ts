import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

enum TYPE {
  SPECIAL = "SPECIAL",
  NORMAL = "NORMAL",
}

export interface ICareer {
  title: string;
  skills: string[];
  description: string;
  isActive: boolean;
  image: IFile;
  _id?: mongoose.ObjectId;
  type: TYPE;
}

const CareerModel = new mongoose.Schema<ICareer>(
  {
    title: {
      type: String,
      required: [true, "عنوان آگهی مورد نیاز است."],
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "توضیحات الزامی میباشد. "],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: FileSchema,
      required: [true, "عکس الزامی است"],
    },
    type: {
      type: String,
      enum: TYPE,
      default: TYPE.NORMAL,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICareer>("Career", CareerModel);
