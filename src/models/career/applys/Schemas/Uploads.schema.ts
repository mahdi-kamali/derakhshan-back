import { FileSchema, IFile } from "@src/models/file/File.model";
import mongoose from "mongoose";

export interface IUploads {
  resume?: IFile;
  organization?: IFile;
}

export const UploadsSchema = new mongoose.Schema<IUploads>(
  {
    resume: { type: FileSchema },
    organization: { type: FileSchema },
  },
  { _id: false },
);
