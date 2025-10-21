import { AppRouter } from "@src/base/AppRouter";
import pagesRouter from "./pages/pages.router";
import contact_usRouter from "./contact-us/contact_us.router";
import orderRouter from "./order/order.router";
import productsRouter from "./products/products.router";
import navsRouter from "./navs/navs.router";

const PublicRouter = new AppRouter();

PublicRouter.use("/pages", pagesRouter);
PublicRouter.use("/contact-us", contact_usRouter);
PublicRouter.use("/order", orderRouter);
PublicRouter.use("/products", productsRouter);
PublicRouter.use("/navs", navsRouter);

export default PublicRouter.getRouter();
