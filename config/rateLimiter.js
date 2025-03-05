import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "./redisClient.js";

const slidingWindowLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // max 10  request
  message: "Too many requests, please try again later.",
});

export default slidingWindowLimiter;
