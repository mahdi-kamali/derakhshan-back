import logger from "jet-logger";

export const SuccessLogger = (message: string) => {
  logger.info(message);
};

export const ErrorLogger = (message: string) => {
  logger.err(message);
};

export const WarningLogger = (message: string) => {
  logger.warn(message);
};

export const InfoLogger = (message: string) => {
  logger.info(message);
};

