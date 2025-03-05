import bcrypt from "bcryptjs";
import { UserModel } from "../postgres/postgres.js";
import { setUser } from "../config/auth.js";
import logger from "../logger/logger.js";


// Get all users
export const getAllUser = async (req, res) => {
  try {
    logger.info("Fetching all users");
    const user = await UserModel.findAll();

    if (user.length === 0) 
     { 
      logger.warn("No users found");
      return res.status(200).json({ message: "No users found" });
    }
    logger.info(`Fetched ${user.length} users`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error in getAllUser: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      logger.warn("Register attempt with missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }
    logger.info(`Registering user: ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ name, email, password_hash: hashedPassword });

    const token = setUser(newUser); // Generate JWT Token
    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    logger.error(`Error in registerUser: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Login attempt for user: ${email}`);

    const user = await UserModel.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      logger.warn(`Login failed: User not found (${email})`);
      return res.status(404).json({ error: "User not found" })
    };

    // Compare the plain text password
    if (password !== user.password_hash) {
      logger.warn(`Login failed: Invalid password (${email})`);
      return res.status(401).json({ error: "Invalid password" });
    }

    // Assuming setUser generates a token for the user
    const token = setUser(user);
    logger.info(`User logged in: ${email}`);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    logger.error(`Error in loginUser: ${error.message}`);
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Logout user
export const logoutUser = async (req, res) => {
  try {
    logger.info("Logout successful");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    logger.error(`Error in logoutUser: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    logger.info(`Updating user: ${userId}`);
    const [updatedRows] = await UserModel.update(req.body, { where: { id: userId } });

    if (updatedRows === 0){
      logger.warn(`User not found: ${userId}`);
       return res.status(404).json({ error: "User not found" })
      };
      logger.info(`User updated: ${userId}`);

    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    logger.error(`Error in updateUser: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {

     logger.info(`Deleting user: ${userId}`);
    const deletedRows = await UserModel.destroy({ where: { id: userId } });

    if (deletedRows === 0){ 
      logger.warn(`User not found: ${userId}`);
      return res.status(404).json({ error: "User not found" })
    };

    logger.info(`User deleted: ${userId}`);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteUser: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
