import bcrypt from "bcryptjs";
import { UserModel } from "../postgres/postgres.js";
import { setUser } from "../config/auth.js";


// Get all users
export const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.findAll();
    if (user.length === 0) return res.status(200).json({ message: "No users found" });
    return res.status(200).json(user);
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
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the plain text password
    if (password !== user.password_hash) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Assuming setUser generates a token for the user
    const token = setUser(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Logout user
export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error(error);
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
