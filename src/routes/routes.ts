import { AppRouter } from "@src/base/AppRouter";

import authRouter from "./auth/auth.router";
const ApiRouter = new AppRouter();

ApiRouter.use("/auth", authRouter);

export default ApiRouter.getRouter();
