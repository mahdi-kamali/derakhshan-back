import ENV from "@src/common/constants/ENV";
import { SuccessLogger, WarningLogger } from "@src/common/util/logger";
import mongoose from "mongoose";

export const ConnectDB = async () => {
  WarningLogger("\n *******************   Connecting DB *****************");

  await mongoose.connect(ENV.DATABASE_URL, {
    directConnection: true,
  });

  return `DB Connected!`;
};
