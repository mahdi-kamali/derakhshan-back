import mongoose, { Schema, Document } from "mongoose";
import LayoutsModel, {
  ISection,
  SectionsSchema,
} from "../section/Sections.model";

export interface IPage extends Document {
  title: string;
  title_en: string;
  slug: string;
  sections: ISection;
  status: "draft" | "published" | "stopped";
  nav: {
    show: boolean;
    icon: string;
  };
}

const PagesModel = new Schema<IPage>(
  {
    title: {
      type: String,
      required: [true, "عنوان صفحه الزامی است"],
      trim: true,
    },
    title_en: {
      type: String,
      required: [true, "عنوان صفحه ( لاتین ) الزامی است"],
      trim: true,
      default: "",
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
    status: {
      type: String,
      enum: ["draft", "published", "stopped"],
      default: "published",
    },
    nav: {
      type: Object,
      default: {
        show: false,
        icon: "",
      },
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

export default mongoose.model<IPage>("Page", PagesModel);
