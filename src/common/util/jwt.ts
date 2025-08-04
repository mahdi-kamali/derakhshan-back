import jwt from "jsonwebtoken";

const TOKEN: any = process.env.ACCESS_TOKEN;

export const JWT = {
  EncodeJWT: (data: any) => {
    const encoded = jwt.sign(data, TOKEN, {
      expiresIn: "1w",
    });

    return encoded;
  },
  DecodeJWT: (data: any) => {
    const decoded = jwt.decode(data, TOKEN);
    return decoded as any;
  },
};
