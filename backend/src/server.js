const express = require("express");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb");
const redisClient = require("./config/redis");
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectMongoDB();
redisClient.connect();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
