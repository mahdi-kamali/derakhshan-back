import { AppRouter } from "@src/base/AppRouter";
import { AdminMiddleWares } from "@src/middlewares/admin.middlewares";
import usersRouter from "./users/users.router";
import layoutRouter from "./layouts/layout.router";
import galleryRouter from "./gallery/gallery.router";
import pagesRouter from "./pages/pages.router";
import careersRouter from "./careers/careers.router";
import contact_usRouter from "./contact-us/contact_us.router";
import orderRouter from "./order/order.router";
import productsRouter from "./products/products.router";
import iconsRouter from "./icons/icons.router";
import sectionsRouter from "./sections/sections.router";
import site_settingsRouter from "./site-settings/site_settings.router";

const AdminRouter = new AppRouter();

AdminRouter.use("/", AdminMiddleWares.isAdmin);

AdminRouter.use("/users", usersRouter);

AdminRouter.use("/layouts", layoutRouter);

AdminRouter.use("/gallery", galleryRouter);

AdminRouter.use("/pages", pagesRouter);

AdminRouter.use("/careers", careersRouter);

AdminRouter.use("/contact-us", contact_usRouter);

AdminRouter.use("/orders", orderRouter);

AdminRouter.use("/products", productsRouter);

AdminRouter.use("/icons", iconsRouter);

AdminRouter.use("/sections", sectionsRouter);

AdminRouter.use("/site-settings", site_settingsRouter);

export default AdminRouter.getRouter();
