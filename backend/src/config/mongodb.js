const mongoose = require("mongoose");
const logger = require("../utils/logger")(module.filename);

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    logger.info("MongoDB Connected...");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
