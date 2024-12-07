const httpStatus = require("http-status");
const {
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/error");
const logger = require("../utils/logger")(module.filename);
const { ValidationError } = require("express-validation");

const handleErrors = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
    stack: err.stack,
    errors: err.errors,
  };

  if (process.env.NODE_ENV === "production") {
    delete defaultError.stack;
  }

  logger.error(err);
  res.status(defaultError.statusCode).json(defaultError);
};

const convertErrors = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new InternalServerError({
      message: "Validation Error",
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  } else if (
    !(err instanceof InternalServerError) &&
    !(err instanceof NotFoundError) &&
    !(err instanceof UnauthorizedError) &&
    !(err instanceof UnauthenticatedError) &&
    !(err instanceof BadRequestError)
  ) {
    convertedError = new InternalServerError({
      message: err.message,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }

  return handleErrors(convertedError, req, res, next);
};

const handleNotFoundError = (req, res, next) => {
  const error = new NotFoundError("The requested resource was not found.");
  return handleErrors(error, req, res);
};

module.exports = {
  handleErrors,
  convertErrors,
  handleNotFoundError,
};
