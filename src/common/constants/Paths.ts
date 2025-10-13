import path from "path";

export const URLS = {
  ADMIN: {},
  AUTH: {},
  FRONT: {},
};

export const DB_CONNECTION_STRING = process.env.DATABASE_URL as string;
export const BASE_DIR = process.cwd();
export const STORAGE_PATH = (target: string) =>
  path.join(process.cwd(), target);
