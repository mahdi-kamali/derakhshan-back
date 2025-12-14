import { AppRouter } from "@src/base/AppRouter";
import UserModel, { IUser } from "@src/models/user/User.model";
import { IGetUser, IGetUsers, IPostUser, IPutUser } from "./users.types";

const UserRouter = new AppRouter();
UserRouter.GET<IGetUsers["REQUEST"], IGetUsers["RESPONSE"]>({
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

UserRouter.GET<IGetUser["REQUEST"], IGetUser["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const user = await UserModel.findById(data._id);
    if (user === null)
      onError({
        data: "کاربر پیدا نشد",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, callBacks, utils) {
    const user = await UserModel.findById(data._id);
    return user!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "کاربر با موفقیت دریافت شد",
      status: "OK",
    };
  },
});

UserRouter.POST<IPostUser["REQUEST"], IPostUser["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const user = new UserModel(data);
    return await user.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "کاربر با موفقیت ایجاد شد.",
      status: "OK",
    };
  },
});

UserRouter.PUT<IPutUser["REQUEST"], IPutUser["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const user = await UserModel.findById(data._id);
    if (user === null)
      onError({
        data: "کاربر پیدا نشد",
        status: "NOT_FOUND",
      });
  },
  async onProccess(data, callBacks, utils) {
    const user = await UserModel.findByIdAndUpdate(
      data._id,
      {
        ...data,
        _id: undefined,
      },
      {
        new: true,
      },
    );

    return await user!!.save();
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "کاربر با موفقیت ویرایش شد.",
      status: "OK",
    };
  },
});

export default UserRouter.getRouter();
