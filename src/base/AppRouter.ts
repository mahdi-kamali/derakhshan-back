import { JWT } from "@src/common/util/jwt";
import { MongooseMiddleWares } from "@src/middlewares/mongose.middleware";
import { MulterMiddleWare } from "@src/middlewares/multer.middlewares";
import { ServerMiddleWres } from "@src/middlewares/server.middlewares";
import { ICallBacks, IMethodProps, IUtills } from "@src/types/Router";
import {
  Router as ExpressRouter,
  NextFunction,
  Request,
  Response,
} from "express";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import { STORAGE_PATH } from "@src/common/constants/Paths";
import lodash from "lodash";

export class AppRouter {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter({ mergeParams: true });
  }

  private MiddleWares<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { onStart, onFinish, onProccess, multer } = props;

    const CallBacks: ICallBacks = {
      onError(err) {
        throw err;
      },
    };

    const Utills: IUtills = {
      jwt: {
        decode(data) {
          return JWT.DecodeJWT(data);
        },
        encode(data) {
          return JWT.EncodeJWT(data);
        },
      },
      fileSystem: {
        deleteFile(props) {
          const { onFail, onSuccess, path } = props;
          const absolutePath = STORAGE_PATH(path);
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            onSuccess();
          } else {
            onFail("File path not eixst");
          }
        },
      },
    };

    const FilesMiddleWare = async (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (!request.files || !multer) {
        return next();
      }

      const files = (request.files as Express.Multer.File[]).map((file) => {
        return {
          ...file,
          path: `storage/${multer.directory}/${file.filename}`,
        };
      });

      const normalize = (name: string) =>
        name.replace("[", ".").replace("]", ""); // normalize FA[image] => FA.image

      files.map((file) => {
        const { fieldname } = file;
        lodash.set(request.body, normalize(fieldname), file);
      });
      request.files = [];
      return next();
    };

    const OnStartMiddleWare = async (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      const data = lodash.merge(
        {},
        request.body,
        request.params,
        request.query,
        request.files,
      );

      await onStart(data, CallBacks, Utills);
      return next();
    };

    // Proccess & Finish
    const OnProccessMiddleWare = async (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      const data = {
        ...request.body,
        ...request.params,
        ...request.query,
        ...request.files,
      };

      const onProccessResult = await onProccess(data, CallBacks, Utills);
      const onFinishResult = await onFinish(
        data,
        onProccessResult,
        CallBacks,
        Utills,
      );

      return response
        .status(StatusCodes[onFinishResult.status])
        .json(onFinishResult);
    };

    return [
      multer && MulterMiddleWare.any(multer.directory),
      FilesMiddleWare,
      OnStartMiddleWare,
      OnProccessMiddleWare,
      MongooseMiddleWares.errors.objectIdError,
      MongooseMiddleWares.errors.validationError,
      MongooseMiddleWares.errors.douplicateError,
      ServerMiddleWres.errors.internal,
    ].filter((middleWare) => !!middleWare);
  }

  public GET<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { path } = props;
    this.router.get(path, this.MiddleWares(props));
    return this;
  }

  public POST<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { path } = props;
    this.router.post(path, this.MiddleWares(props));
    return this;
  }

  public PUT<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { path } = props;
    this.router.put(path, this.MiddleWares(props));
    return this;
  }

  public DELETE<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { path } = props;
    this.router.delete(path, this.MiddleWares(props));
    return this;
  }

  public use(
    path: string,
    middleWare: (req: Request, res: Response, next: NextFunction) => void,
  ) {
    return this.router.use(path, middleWare);
  }

  public getRouter(): ExpressRouter {
    this.router.use((err: any, req: any, res: any, next: any) => {
      return res.json(err);
    });
    return this.router;
  }
}
