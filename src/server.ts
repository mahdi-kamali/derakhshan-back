import morgan from "morgan";
import express from "express";
import ApiRouter from "@src/routes/routes";
import CorsMiddleWare from "./middlewares/cors.middlewares";
import path from "path";
import dotenv from "dotenv";

/******************************************************************************
                                Setup
******************************************************************************/
dotenv.config();
const app = express();
const storagePath = path.join(process.cwd(), "storage");
app.use("/storage", express.static(storagePath));

console.log(storagePath);

// Basic middleware
app.use(CorsMiddleWare.any);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api", ApiRouter);

export default app;
