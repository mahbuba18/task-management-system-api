import { UserModel } from "../postgres/postgres.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getAllUser = async (req, res) => {
    try {
        // Ensure that the model is available and initialized
        if (!UserModel) {
            return res.status(500).json({ "error": "User model not initialized" });
        }

        const users = await UserModel.findAll(); // Fetch all users from the database

        if (users.length === 0) {
            return res.status(200).json({ "message": "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "error": "Internal server error" });
    }
};

export const addUser = async (req, res) => {
    try {
        const { id, name, email, password_hash } = req.body || {}; // Ensure req.body exists

        if (!name || !email || !password_hash) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await User.create({ name, email, password_hash });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.userId; // Get user ID from URL params

    try {
        const [updatedRows] = await UserModel.update(req.body, { where: { id: userId } });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "User not found " });
        }

        return res.status(200).json({ message: "Updated successfully" });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const deleteUser = async (req, res) => {
    const userId = req.params.userId; // Get user ID from URL params

    try {
        // Attempt to delete the user
        const deletedRows = await UserModel.destroy({ where: { id: userId } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};