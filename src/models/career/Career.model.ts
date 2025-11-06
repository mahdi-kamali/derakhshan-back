import mongoose from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

enum TYPE {
  SPECIAL = "SPECIAL",
  NORMAL = "NORMAL",
}

export interface ICareer {
  _id: mongoose.ObjectId;
  EN: {
    title: string;
    skills: string[];
    description: string;
    isActive: boolean;
    image: IFile;
    _id?: mongoose.ObjectId;
    type: TYPE;
  };
  FA: {
    title: string;
    skills: string[];
    description: string;
    isActive: boolean;
    image: IFile;
    _id?: mongoose.ObjectId;
    type: TYPE;
  };
}

interface IData {
  title: string;
  skills: string[];
  description: string;
  isActive: boolean;
  image: IFile;
  _id?: mongoose.ObjectId;
  type: TYPE;
}

const DataModel = new mongoose.Schema<IData>({
  title: {
    type: String,
    required: [true, "عنوان الزامی میباشد"],
    trim: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: [true, "توضیحات الزامی میباشد"],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: FileSchema,
    required: [true, "تصویر الزامی میباشد"],
  },
  type: {
    type: String,
    enum: Object.values(TYPE),
    default: TYPE.NORMAL,
  },
});

export const CareerSchema = new mongoose.Schema<ICareer>(
  {
    EN: {
      type: DataModel,
      required: [true, "لطفا زبان انگلیسی را پر کنید"],
    },
    FA: {
      type: DataModel,
      required: [true, "لطفا زبان فارسی را پر کنید"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICareer>("Career", CareerSchema);
