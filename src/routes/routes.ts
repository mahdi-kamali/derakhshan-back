import { AppRouter } from "@src/base/AppRouter";

import authRouter from "./auth/auth.router";
import adminRouter from "./admin/admin.router";
import { AdminMiddleWares } from "@src/middlewares/admin.middlewares";
const ApiRouter = new AppRouter();


ApiRouter.use("/auth", authRouter);
ApiRouter.use("/admin", adminRouter);

export default ApiRouter.getRouter();
