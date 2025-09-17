import morgan from "morgan";
import express from "express";
import { NodeEnvs } from "@src/common/constants";

import ApiRouter from "@src/routes/routes";
import CorsMiddleWare from "./middlewares/cors.middlewares";
import path from "path";

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();
const storagePath = path.join(__dirname.replace("src", ""), "/storage");
// Basic middleware
app.use(CorsMiddleWare.any);
app.use("/storage", express.static(storagePath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api", ApiRouter);

export default app;
