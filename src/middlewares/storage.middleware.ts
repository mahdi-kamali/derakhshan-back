import { Request, Response, NextFunction, static as static_ } from "express";

import path from "path";

const paths = {
  storage: path.join(__dirname, "storage"),
};

const StorageMiddleWare = {};

export default StorageMiddleWare;
