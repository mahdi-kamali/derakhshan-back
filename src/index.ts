import server from "./server";
import { ErrorLogger, SuccessLogger } from "./common/util/logger";
import { ConnectDB } from "./db/DB";
import ENV from "./common/constants/ENV";

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = "Express server started on port: " + ENV.PORT;

/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(ENV.PORT, async (err) => {
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
