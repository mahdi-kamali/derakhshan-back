import mongoose from "mongoose";
import { IFile } from "../file/File.model";

interface ISocial {
  label: string;
  icon: string;
  url: string;
}

interface ILink {
  label: string;
  icon: string;
  href: string;
}

interface ITrust {
  image: IFile;
  href: string;
}

export interface ISiteSettings {
  siteName: "derakhshan";
  EN: {
    socials: ISocial[];
    links: ILink[];
    phone: string;
    email: string;
    address: string;
    work_time: string;
    trusts: ITrust[];
  };
  FA: {
    socials: ISocial[];
    links: ILink[];
    phone: string;
    email: string;
    address: string;
    work_time: string;
    trusts: ITrust[];
  };
}

const SiteSettingsSchema = new mongoose.Schema<ISiteSettings>(
  {
    siteName: {
      type: String,
      default: "derakhshan",
      unique: true,
    },
    EN: {
      type: mongoose.SchemaTypes.Mixed,
    },
    FA: {
      type: mongoose.SchemaTypes.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SiteSettings", SiteSettingsSchema);
