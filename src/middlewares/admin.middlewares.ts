import { JWT } from "@src/common/util/jwt";
import UserModel from "@src/models/user/User.model";
import { Request, Response, NextFunction } from "express";

export const AdminMiddleWares = {
  isAdmin: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(403).json({
        data: "توکن الزامی میباشد",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const rawUser = JWT.DecodeJWT(token);

    const user = await UserModel.findOne({
      phone: rawUser.phone,
    });

    if (user?.role !== "Admin")
      return res.status(403).json({
        data: "توکن اشتباه است.",
        message: "خطایی رخ داده است",
        status: "BAD_REQUEST",
      });

    req.user = user;

    next();
  },
};
