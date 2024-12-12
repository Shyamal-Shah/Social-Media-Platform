const redis = require("redis");
const logger = require("../utils/logger")(module.filename);

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on("connect", () => logger.info("Redis Connected..."));
client.on("error", (err) => logger.error("Redis Error:", err));

module.exports = client;
