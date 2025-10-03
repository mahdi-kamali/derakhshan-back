import { AppRouter } from "@src/base/AppRouter";
import pagesRouter from "./pages/pages.router";
import contact_usRouter from "./contact-us/contact_us.router";
import orderRouter from "./order/order.router";

const PublicRouter = new AppRouter();

PublicRouter.use("/pages", pagesRouter);
PublicRouter.use("/contact-us", contact_usRouter);
PublicRouter.use("/order", orderRouter);

export default PublicRouter.getRouter();
