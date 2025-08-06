import { NextFunction, Request, Response } from "express";
import { MongooseErrorMessages } from "../db/errors.mongos";

export const MongooseMiddleWares = {
  errors: {
    validationError: (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      if (err.name === "ValidationError") {
        const result = Object.entries(err.errors).map((object) => {
          const key = object[0];
          const value = (object[1] as any).message;
          return value;
        });

        return res.status(400).json({
          data: result,
          message: "خطایی در فرمت داده ها وجود دارد",
          status: "BAD_REQUEST",
        });
      }

      return next(err);
    },
    douplicateError: (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      if (err.code === 11000) {
        const field = Object.entries(err.keyPattern)[0][0];

        const result = {
          // @ts-ignore
          data: MongooseErrorMessages[field].unique,
          message: "خطایی رخ داده است",
          status: "BAD_REQUEST",
        };

        return res.status(400).json(result);
      }

      return next(err);
    },
    objectIdError: (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      if (err.kind === "ObjectId") {
        const field = err.path;

        const result = {
          data: MongooseErrorMessages.object._id.replace("{field}", field),
          message: "خطایی رخ داده است",
          status: "BAD_REQUEST",
        };

        return res.status(400).json(result);
      }

      return next(err);
    },
  },
};
