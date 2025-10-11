import { AppRouter } from "@src/base/AppRouter";

import authRouter from "./auth/auth.router";
import adminRouter from "./admin/admin.router";
import publicRouter from "./public/public.router";
import webHooksRouter from "./webhook/webhook.router";
const ApiRouter = new AppRouter();

ApiRouter.use("/auth", authRouter);
ApiRouter.use("/admin", adminRouter);
ApiRouter.use("/public", publicRouter);
ApiRouter.use("/webhook", webHooksRouter);

export default ApiRouter.getRouter();
