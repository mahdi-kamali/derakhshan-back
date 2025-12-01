import mongoose from "mongoose";

export interface IPersonalInfo {
  fullName?: string;
  nationalId?: string;
  birthDate?: string;
  birthPlace?: string;
  issuePlace?: string;
  maritalStatus?: string;
  militaryStatus?: string;
  fatherName?: string;
  fatherJob?: string;
  insuranceHistory?: string;
  phoneNumber?: string;
  gender: "male" | "female";
}

export const PersonalInfoSchema = new mongoose.Schema<IPersonalInfo>(
  {
    fullName: { type: String },
    nationalId: { type: String },
    birthDate: { type: String },
    birthPlace: { type: String },
    issuePlace: { type: String },
    maritalStatus: { type: String },
    militaryStatus: { type: String },
    fatherName: { type: String },
    fatherJob: { type: String },
    insuranceHistory: { type: String },
    phoneNumber: { type: String },
    gender: { type: String },
  },
  { _id: false },
);
