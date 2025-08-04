import { Response, Request, NextFunction } from "express";

export const ServerMiddleWres = {
  errors: {
    internal: async (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const status = err?.status;
      res.status(status || 500).json(err);
    },
  },
};
