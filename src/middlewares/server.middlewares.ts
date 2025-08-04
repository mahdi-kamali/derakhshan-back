import { Response, Request } from "express";

export const ServerMiddleWres = {
  errors: {
    internal: async (err: any, req: Request, res: Response) => {
      const status = err?.status;
      res
        .status(500)
        .status(status || 500)
        .json(err);
    },
  },
};
