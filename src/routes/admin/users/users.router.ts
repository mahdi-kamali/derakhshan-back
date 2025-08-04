import { AppRouter } from "@src/base/AppRouter";
import UserModel, { IUser } from "@src/models/user/User.model";

const UserRouter = new AppRouter();
UserRouter.GET<any, IUser[]>({
  path: "/",
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

export default UserRouter.getRouter();
