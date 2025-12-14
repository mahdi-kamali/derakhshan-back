import { Response, Request, NextFunction } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";

export const ServerMiddleWres = {
  errors: {
    internal: async (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      console.log(err)
      const status = err?.status ? StatusCodes[err.status] : 500;
      res.status(status as any).json(err);
    },
  },
};
