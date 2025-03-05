import express from "express";
import { deleteUser, getAllUser, loginUser, logoutUser, registerUser, updateUser } from "../controller/userController.js";
import slidingWindowLimiter from "../config/rateLimiter.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",slidingWindowLimiter, loginUser);
router.post("/logout",slidingWindowLimiter,logoutUser)
router.get("/user", getAllUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
