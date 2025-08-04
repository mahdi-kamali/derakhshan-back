import ENV from "@src/common/constants/ENV";
import server from "./server";
import {
  ErrorLogger,
  SuccessLogger,
  WarningLogger,
} from "./common/util/logger";
import { ConnectDB } from "./db/DB";

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG =
  "Express server started on port: " + ENV.Port.toString();

/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(ENV.Port, async (err) => {
  if (!!err) {
    ErrorLogger(err.message);
  } else {
    await ConnectDB()
      .then((res) => {
        SuccessLogger(res);
        SuccessLogger(SERVER_START_MSG);
        return res;
      })
      .catch((err) => {
        ErrorLogger(err);
        return err;
      });
  }
});
