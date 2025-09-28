import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

export interface ICareer {
  title: string;
  skills: string[];
  description: string;
  isActive: boolean;
  image: IFile;
  _id?: mongoose.ObjectId;
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
    image : {
      type : FileSchema,
      required : [true , "عکس الزامی است"]
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICareer>("Career", CareerModel);
