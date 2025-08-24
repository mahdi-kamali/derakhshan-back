import mongoose from "mongoose";

export interface ISectionCU {
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

export interface ISection {
  _id: string;
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

export interface ISectionCU {
  _id: string;
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

export const SectionsSchema = new mongoose.Schema<ISection>(
  {
    name: {
      type: String,
      required: [true, "اسم سکشن الزامی است."],
    },
    type: {
      type: String,
      required: [true, "نوع سکشن الزامی است."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    components: {
      type: Object,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Sections", SectionsSchema);
