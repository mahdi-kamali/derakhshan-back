import { AppRouter } from "@src/base/AppRouter";
import UserModel, {
  ILogin,
  IRegister,
  IUser,
} from "@src/models/user/User.model";

const AuthRouter = new AppRouter();

AuthRouter.POST<ILogin, IUser>({
  path: "/login",
  async onStart(data, { onError }) {
    const { password, phone } = data;
    if (!password)
      onError({
        data: "پسورد الزامی است",
        message: "خطایی بوجود آمده است",
        status: "UNAUTHORIZED",
      });
    if (!phone)
      onError({
        data: "شماره همراه الزامی است",
        message: "خطایی بوجود آمده است",
        status: "UNAUTHORIZED",
      });

    const user = await UserModel.findOne({
      password: password,
      phone: phone,
    });

    if (user === null)
      onError({
        data: "رمزعبور یا شماره همراه اشتباه است",
        message: "خطایی بوجود آمده است",
        status: "UNAUTHORIZED",
      });
  },
  async onProccess(data, { onError }) {
    const { password, phone } = data;
    const user = await UserModel.findOne({
      password: password,
      phone: phone,
    }).select("-password");

    return user!!;
  },
  async onFinish(request, data, callBacks, { jwt }) {
    return {
      data: data,
      message: "ورود شما با موفقیت انجام شد.",
      status: "OK",
      token: jwt.encode({
        phone: data.phone,
      }),
    };
  },
});

AuthRouter.POST<IRegister, IUser>({
  path: "/register",
  async onStart(data, callBacks) {},
  async onProccess(data, callBacks) {
    await UserModel.syncIndexes();
    const user = new UserModel(data);
    return await user.save();
  },
  async onFinish(request, data, callBacks, { jwt }) {
    return {
      data: data,
      message: "ثبت نام با موفقیت انجام شد.",
      status: "OK",
      token: jwt.encode({
        phone: data.phone,
      }),
    };
  },
});

export default AuthRouter.getRouter();
