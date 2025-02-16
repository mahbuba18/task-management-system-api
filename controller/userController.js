import { UserModel } from "../postgres/postgres.js";

export const getAllEmp = async (req, res) => {
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