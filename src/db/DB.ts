import { DB_CONNECTION_STRING } from "@src/common/constants/Paths";
import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
  return `_______ -> DB Connected <- ________`;
};
