const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb");
const redisClient = require("./config/redis");
const logger = require("./utils/logger")(module.filename);
const http = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");

dotenv.config();

connectMongoDB();

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const redis = new Redis();

redis.subscribe("postUpdates", "commentUpdates");
redis.on("message", (channel, message) => {
  io.emit(channel, JSON.parse(message));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
