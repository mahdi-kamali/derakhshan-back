import { NextFunction, Request, Response } from "express";

export const ReCaptchaMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers;
  return next();
};
