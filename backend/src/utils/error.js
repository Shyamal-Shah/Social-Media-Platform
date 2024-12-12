const httpStatus = require("http-status");

class APIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.BAD_REQUEST;
  }
}

class NotFoundError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.NOT_FOUND;
  }
}

class UnauthenticatedError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}

class UnauthorizedError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.FORBIDDEN;
  }
}

class InternalServerError extends APIError {
  constructor({
    message,
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    stack = null,
  }) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    this.message = message;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  InternalServerError,
};
