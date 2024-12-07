const passport = require("passport");
const { handleErrors } = require("./errorHandler");
const { UnauthenticatedError } = require("../utils/error");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user)
      return handleErrors(new UnauthenticatedError("Unauthorized"), req, res);

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;
