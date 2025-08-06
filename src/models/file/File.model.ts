import mongoose from "mongoose";

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const FileSchema = new mongoose.Schema<IFile>(
  {
    fieldname: {
      type: String,
      required: [true, "نام فیلد فایل الزامی است."],
      trim: true,
    },
    originalname: {
      type: String,
      required: [true, "نام اصلی فایل الزامی است."],
      trim: true,
    },
    encoding: {
      type: String,
      required: [true, "Encoding فایل الزامی است."],
      trim: true,
    },
    mimetype: {
      type: String,
      required: [true, "نوع فایل (MIME) الزامی است."],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "مسیر مقصد ذخیره‌سازی الزامی است."],
      trim: true,
    },
    filename: {
      type: String,
      required: [true, "نام فایل ذخیره شده الزامی است."],
      trim: true,
    },
    path: {
      type: String,
      required: [true, "مسیر کامل فایل الزامی است."],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "اندازه فایل الزامی است."],
      min: [1, "اندازه فایل باید بزرگتر از صفر باشد."],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IFile>("File", FileSchema);
