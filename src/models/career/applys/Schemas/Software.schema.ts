import mongoose from "mongoose";

export interface ISoftware {
  name: string;
  level: string;
}

export const SoftwareSchema = new mongoose.Schema<ISoftware>(
  {
    name: { type: String },
    level: { type: String },
  },
  { _id: false },
);
