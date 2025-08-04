import { IUser } from "@src/models/user/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or a more specific type like { id: string, role: string }
    }
  }
}
