import express from "express";
import { deleteUser, getAllUser, loginUser, registerUser, updateUser } from "../controller/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
