import { AppRouter } from "@src/base/AppRouter";
import pagesRouter from "./pages/pages.router";
import contact_usRouter from "./contact-us/contact_us.router";

const PublicRouter = new AppRouter();

PublicRouter.use("/pages", pagesRouter);
PublicRouter.use("/contact-us", contact_usRouter);

export default PublicRouter.getRouter();
