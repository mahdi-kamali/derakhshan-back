import { AppRouter } from "@src/base/AppRouter";
import { AdminMiddleWares } from "@src/middlewares/admin.middlewares";
import usersRouter from "./users/users.router";
import layoutRouter from "./layouts/layout.router";
import galleryRouter from "./gallery/gallery.router";

const AdminRouter = new AppRouter();

AdminRouter.use("/", AdminMiddleWares.isAdmin);

AdminRouter.use("/users", usersRouter);

AdminRouter.use("/layouts", layoutRouter);

AdminRouter.use("/gallery", galleryRouter);

export default AdminRouter.getRouter();
