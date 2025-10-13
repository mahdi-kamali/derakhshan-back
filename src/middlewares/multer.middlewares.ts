import multer from "multer";
import path from "path";
import fs from "fs";

const upload = (directory: string) => {
  // Always upload to root-level storage directory (outside dist)

  const rootPath = process.cwd();
  const uploadPath = path.join(rootPath, "storage", directory);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
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
