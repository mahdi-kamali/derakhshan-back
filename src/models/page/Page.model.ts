import mongoose, { Schema, Document } from "mongoose";
import LayoutsModel, {
  ISection,
  SectionsSchema,
} from "../section/Sections.model";

export interface IPage extends Document {
  title: string;
  slug: string;
  sections: ISection;
  metaTitle?: string;
  metaDescription?: string;
  status: "draft" | "published" | "stopped";
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageCU {
  title: string;
  slug: string;
  sections: string;
  metaTitle?: string;
  metaDescription?: string;
  status: "draft" | "published" | "stopped";
}

const PagesModel = new Schema<IPage>(
  {
    title: {
      type: String,
      required: [true, "عنوان صفحه الزامی است"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "اسلاگ الزامی است"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    sections: {
      type: [mongoose.Schema.ObjectId],
      default: [],
      ref: "Sections",
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "stopped"],
      default: "published",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

export default mongoose.model<IPage>("Page", PagesModel);
