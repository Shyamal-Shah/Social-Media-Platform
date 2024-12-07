const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb");
const redisClient = require("./config/redis");
const logger = require("./utils/logger")(module.filename);

dotenv.config();

connectMongoDB();
redisClient.connect();

const app = require("./app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
