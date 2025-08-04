import { AppRouter } from "@src/base/AppRouter";
import { AdminMiddleWares } from "@src/middlewares/admin.middlewares";
import UserModel, { IUser } from "@src/models/user/User.model";

const AdminRouter = new AppRouter();

AdminRouter.use("/", AdminMiddleWares.isAdmin);

AdminRouter.GET<any, IUser[]>({
  path: "/users",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const users = await UserModel.find();
    return users;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست کاربران با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

export default AdminRouter.getRouter();
