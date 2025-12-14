import mongoose from "mongoose";

export interface IContactUs {
  firstName: string;
  lastName: string;
  email: string;
  website?: string;
  address: string;
  phone: string;
  message: string;
  _id?: string;
  status: STATUS;
}

enum STATUS {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

const ContactUSchema = new mongoose.Schema<IContactUs>(
  {
    firstName: {
      type: String,
      required: [true, "اسم شما الزامی است"],
    },
    lastName: {
      type: String,
      required: [true, "نام خانوادگی شما الزامی است"],
    },
    email: {
      type: String,
      required: [true, "ایمیل شما الزامی است"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "تلفن شما الزامی است"],
    },
    message: {
      type: String,
      required: [true, "متن پیام شما الزامی است"],
    },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.OPEN,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IContactUs>("Contact-Us", ContactUSchema);
