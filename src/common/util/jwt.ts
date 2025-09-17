import jwt from "jsonwebtoken";
import ENV from "../constants/ENV";


export const JWT = {
  EncodeJWT: (data: any) => {
    const encoded = jwt.sign(data, ENV.ACCESS_TOKEN, {
      expiresIn: "1w",
    });

    return encoded;
  },
  DecodeJWT: (data: any) => {
    const decoded = jwt.decode(data, ENV.ACCESS_TOKEN);
    return decoded as any;
  },
};
