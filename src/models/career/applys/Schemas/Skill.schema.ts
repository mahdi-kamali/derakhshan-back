import mongoose from "mongoose";

export interface ISkill {
  name: string;
  level: string;
}

export const SkillSchema = new mongoose.Schema<ISkill>(
  {
    name: { type: String },
    level: { type: String },
  },
  { _id: false },
);
