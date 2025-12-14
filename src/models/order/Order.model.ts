import mongoose, { Schema, Document } from "mongoose";
import { FileSchema, IFile } from "../file/File.model";

enum INDUSTRY_ENUM {
  FOOD = "FOOD",
  COSMETICS = "COSMETICS",
  HELTHCARE = "HELTHCARE",
  OTHER = "OTHER",
}

export interface IOrder extends Document {
  user: {
    name: string;
    family: string;
    phone: string;
    email: string;
    country: string;
  };
  companyName: string;
  industry: INDUSTRY_ENUM;
  product: {
    image: IFile;
    type: string;
    weight: number;
    quantity: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  description: string;
}

const OrdersSchema = new Schema<IOrder>(
  {
    user: {
      name: { type: String, required: [true, "نام الزامی است"] },
      family: { type: String, required: [true, "نام خانوادگی الزامی است"] },
      phone: { type: String, required: [true, "شماره تماس الزامی است"] },
      email: { type: String, required: [true, "ایمیل  الزامی است"] },
      country: { type: String,default : "ایران" },
    },
    companyName: { type: String, required: [true, "نام شرکت الزامی است"] },
    industry: {
      type: String,
      enum: Object.values(INDUSTRY_ENUM),
      required: [true, "انتخاب صنعت الزامی است"],
    },
    product: {
      image: {
        type: FileSchema,
        ref: "Files",
        required: [true, "تصویر محصول الزامی است"],
      },
      type: { type: String, required: [true, "نوع محصول الزامی است"] },
      weight: { type: Number, required: [true, "وزن محصول الزامی است"] },
      quantity: { type: Number, required: [true, "تعداد محصول الزامی است"] },
      dimensions: {
        length: { type: Number, required: [true, "طول محصول الزامی است"] },
        width: { type: Number, required: [true, "عرض محصول الزامی است"] },
        height: { type: Number, required: [true, "ارتفاع محصول الزامی است"] },
      },
    },
    description: {
      type: String,
      required: [true, "توضیحات الزامی است"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>("Order", OrdersSchema);
