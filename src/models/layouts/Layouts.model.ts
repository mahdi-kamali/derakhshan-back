import mongoose from "mongoose";

export interface ILayoutCU {
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

export interface ILayout {
  _id: string;
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

const LayoutsModel = new mongoose.Schema<ILayout>(
  {
    name: {
      type: String,
      required: [true, "اسم لایه الزامی است."],
      unique: true,
    },
    type: {
      type: String,
      required: [true, "نوع لایه بندی الزامی است."],
    },
    page: {
      type: String,
      required: [true, "صفحه الزامی است."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    components: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Layout", LayoutsModel);
