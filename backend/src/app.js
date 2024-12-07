const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./utils/logger")(module.filename);

const passport = require("passport");
const { convertError, handleErrors, notFound, handleNotFoundError, convertErrors } = require("./middleware/errorHandler");
require("./config/passport")(passport);

const app = express();

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message),
    },
  })
);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(passport.initialize());

app.use("/api/v1", require("./routes/v1"));

app.use(convertErrors);
app.use(handleNotFoundError);
app.use(handleErrors);

module.exports = app;
