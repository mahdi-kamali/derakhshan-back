import multer from "multer";
import path from "path";
import fs from "fs";

const upload = (directory: string) => {
  directory = `storage/${directory}`;
  const uploadPath = directory;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};

export const MulterMiddleWare = {
  any: (directory: string) => upload(directory).any(),
};
