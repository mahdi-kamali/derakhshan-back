import mongoose from "mongoose";
import CareerModel, { ICareer } from "../Career.model";
import { FileSchema, IFile } from "@src/models/file/File.model";
import { PersonalInfoSchema } from "./Schemas/PersonalInfo.schema";
import { EducationSchema } from "./Schemas/Education.schema";
import { WorkExperienceSchema } from "./Schemas/WorkExperience.schema";
import { SkillSchema } from "./Schemas/Skill.schema";
import { SoftwareSchema } from "./Schemas/Software.schema";
import { LanguageSchema } from "./Schemas/Language.schema";
import { UploadsSchema } from "./Schemas/Uploads.schema";

const CareerApplySchema = new mongoose.Schema(
  {
    career_id: {
      type: String,
      required: [true, "آگهی مورد نیاز است"],
    },
    personalInfo: { type: PersonalInfoSchema, required: true },
    education: { type: [EducationSchema], default: [] },
    workExperience: { type: WorkExperienceSchema, required: true },
    skills: { type: [SkillSchema], default: [] },
    software: { type: [SoftwareSchema], default: [] },
    languages: { type: [LanguageSchema], default: [] },
    uploads: { type: UploadsSchema },
    description: { type: String },
    expectedSalary: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("CareerApply", CareerApplySchema);
