import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379", // Default Redis URL
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

await redisClient.connect(); // Make sure to use await

export default redisClient;
