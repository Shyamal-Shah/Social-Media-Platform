const { createLogger, format, transports } = require("winston");
const path = require("path");

const options = (prefix) => ({
  level: "debug",
  format: format.combine(
    format.label({ label: path.basename(prefix) }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.printf(
      (info) =>
        `${info.timestamp} [${info.level}] [${info.label}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

const logger = (prefix) => createLogger(options(prefix));

module.exports = logger;
