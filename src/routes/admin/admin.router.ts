import { AppRouter } from "@src/base/AppRouter";
import { AdminMiddleWares } from "@src/middlewares/admin.middlewares";
import usersRouter from "./users/users.router";
import layoutRouter from "./layouts/layout.router";
import galleryRouter from "./gallery/gallery.router";
import pagesRouter from "./pages/pages.router";
import categoriesRouter from "./categories/categories.router";
import careersRouter from "./careers/careers.router";
import contact_usRouter from "./contact-us/contact_us.router";

const AdminRouter = new AppRouter();

AdminRouter.use("/", AdminMiddleWares.isAdmin);

AdminRouter.use("/users", usersRouter);

AdminRouter.use("/layouts", layoutRouter);

AdminRouter.use("/gallery", galleryRouter);

AdminRouter.use("/pages", pagesRouter);

AdminRouter.use("/categories", categoriesRouter);

AdminRouter.use("/careers", careersRouter);

AdminRouter.use("/contact-us", contact_usRouter);

export default AdminRouter.getRouter();
