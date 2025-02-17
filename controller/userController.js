import bcrypt from "bcryptjs";
import { UserModel } from "../postgres/postgres.js";
import { setUser } from "../config/auth.js";


// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    if (users.length === 0) return res.status(200).json({ message: "No users found" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ name, email, password_hash: hashedPassword });

    const token = setUser(newUser); // Generate JWT Token
    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: "Invalid password" });

    const token = setUser(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [updatedRows] = await UserModel.update(req.body, { where: { id: userId } });

    if (updatedRows === 0) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedRows = await UserModel.destroy({ where: { id: userId } });

    if (deletedRows === 0) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
