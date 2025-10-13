import { IFile } from "@src/models/file/File.model";
import { IGallery } from "@src/models/gallery/Gallery.model";

export interface IDeleteImage {
  REQUEST: {
    gallery_id: IGallery["_id"];
    _id: IFile["_id"];
  };
  RESPONSE: any;
}
