import mongoose from "mongoose";

export interface IWork {
  organization?: string;
  role?: string;
  duration?: string;
  terminationReason?: string;
}

export interface IWorkExperience {
  lastSalary?: string;
  insuranceDuration?: string;
  usedUnemploymentInsurance?: string;
  works?: IWork[];
}

const WorkSchema = new mongoose.Schema<IWork>(
  {
    organization: { type: String },
    role: String,
    duration: { type: String },
    terminationReason: { type: String },
  },
  { _id: false },
);

export const WorkExperienceSchema = new mongoose.Schema<IWorkExperience>(
  {
    lastSalary: { type: String },
    insuranceDuration: { type: String },
    usedUnemploymentInsurance: { type: String },
    works: [WorkSchema],
  },
  { _id: false },
);
