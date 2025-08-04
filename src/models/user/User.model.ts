import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  phone: string;
  role: "User" | "Admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegister extends Document {
  name: string;
  password: string;
  phone: string;
}

export interface ILogin {
  password: string;
  phone: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    phone: {
      type: String,
      match: [/^\d{10,15}$/, "شماره تلفن معتبر نیست"],
      required: [true, "شماره تلفن الزامی است."],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "نام شما الزامی است"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
      minlength: [6, "رمز عبور باید حداقل ۶ کاراکتر باشد"],
    },
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
