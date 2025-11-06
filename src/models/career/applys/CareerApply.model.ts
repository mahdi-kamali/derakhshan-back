import mongoose from "mongoose";
import CareerModel, { ICareer } from "../Career.model";

export interface ICareerApply {
  career_id?: ICareer["_id"];
  name: string;
  family: string;
  phone: string;
  address: string;
  description: string;
}

const CareerApplySchema = new mongoose.Schema<ICareerApply>(
  {
    career_id: {
      type: mongoose.Schema.ObjectId,
      ref: CareerModel,
      required: [true, "آگهی درخواستی مورد نیاز است"],
    },
    address: {
      type: String,
      required: [true, "آدرس مورد نیاز است"],
    },
    description: {
      type: String,
      required: [true, "توضیحات درباره شما مورد نیاز است"],
    },
    family: {
      type: String,
      required: [true, "نام خانوادگی شما مورد نیاز است"],
    },
    name: {
      type: String,
      required: [true, "نام شما مورد نیاز است"],
    },
    phone: {
      type: String,
      required: [true, "شمار همراه مورد نیاز است"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("CareerApply", CareerApplySchema);
