import morgan from "morgan";
import express from "express";
import ENV from "@src/common/constants/ENV";
import { NodeEnvs } from "@src/common/constants";

import ApiRouter from "@src/routes/routes";
import { ServerMiddleWres } from "./middlewares/server.middlewares";

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ApiRouter);
app.use(ServerMiddleWres.errors.internal);

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

export default app;
