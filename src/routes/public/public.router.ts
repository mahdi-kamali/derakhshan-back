import { AppRouter } from "@src/base/AppRouter";
import pagesRouter from "./pages/pages.router";

const PublicRouter = new AppRouter();

PublicRouter.use("/pages", pagesRouter);

export default PublicRouter.getRouter();
