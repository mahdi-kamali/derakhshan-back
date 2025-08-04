import mongoose from "mongoose";

export interface IGallery {
  _id: string;
  title: string;
}

export interface IGalleryCU {
  title: string;
}

const GalleryModel = new mongoose.Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, "اسم گالری الزامی است"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Gallery", GalleryModel);
