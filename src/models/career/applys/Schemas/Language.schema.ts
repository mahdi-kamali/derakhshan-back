import mongoose from "mongoose";

export interface ILanguage {
  name: string;
  level: string;
}

export const LanguageSchema = new mongoose.Schema<ILanguage>(
  {
    name: { type: String },
    level: { type: String },
  },
  { _id: false },
);
