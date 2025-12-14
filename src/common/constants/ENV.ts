import dontenv from "dotenv";

dontenv.config();

/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = process.env as any;

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  PORT: ENV.PORT,
  DATABASE_URL: ENV.DATABASE_URL,
  ACCESS_TOKEN: ENV.ACCESS_TOKEN,
};
