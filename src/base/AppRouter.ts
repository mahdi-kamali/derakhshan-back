import { JWT } from "@src/common/util/jwt";
import { MongooseMiddleWares } from "@src/db/mongose.middleware";
import { ServerMiddleWres } from "@src/middlewares/server.middlewares";
import { ICallBacks, IMethodProps, IUtills } from "@src/types/Router";
import {
  Router as ExpressRouter,
  NextFunction,
  Request,
  Response,
} from "express";
import { StatusCodes } from "http-status-codes";

export class AppRouter {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
  }

  private MiddleWares<REQ = any, RES = any>(props: IMethodProps<REQ, RES>) {
    const { onStart, onFinish, onProccess } = props;

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
    };

    return [
      async (request: Request, response: Response, next: NextFunction) => {
        const data = {
          ...request.body,
          ...request.params,
          ...request.query,
        };

        const onStartResult = await onStart(data, CallBacks, Utills);
        next();
      },
      async (request: Request, response: Response, next: NextFunction) => {
        const data = {
          ...request.body,
          ...request.params,
          ...request.query,
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
      },
      MongooseMiddleWares.errors.validationError,
      MongooseMiddleWares.errors.douplicateError,
    ];
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

  public use(
    path: string,
    middleWare: (req: Request, res: Response, next: NextFunction) => void,
  ) {
    this.router.use(path, middleWare);
    return this;
  }

  public getRouter(): ExpressRouter {
    this.router.use((err: any, req: any, res: any, next: any) => {
      return res.json(err);
    });
    return this.router;
  }
}
