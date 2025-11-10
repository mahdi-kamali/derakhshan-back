import mongoose from "mongoose";

export interface IEducation {
  fieldOfStudy?: string;
  level?: string;
  gpa?: string;
  institute?: string;
}

export const EducationSchema = new mongoose.Schema<IEducation>(
  {
    fieldOfStudy: { type: String },
    level: { type: String },
    gpa: { type: String },
    institute: { type: String },
  },
  { _id: false },
);
