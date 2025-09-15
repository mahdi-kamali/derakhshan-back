import { DB_CONNECTION_STRING } from "@src/common/constants/Paths";
import { SuccessLogger, WarningLogger } from "@src/common/util/logger";
import mongoose from "mongoose";

export const ConnectDB = async () => {
  WarningLogger("\n *******************   Connecting DB *****************");

  await mongoose.connect(DB_CONNECTION_STRING, {
    directConnection: true,
  });

  return `DB Connected!`;
};
