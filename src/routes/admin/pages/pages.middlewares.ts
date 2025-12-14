import { Request, Response, NextFunction } from "express";

const CheckPage = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.body;
  return res.json(_id);
};

const PagesMiddleWares = {
  CheckPage,
};

export default PagesMiddleWares;
