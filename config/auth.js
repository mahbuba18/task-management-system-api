import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate JWT Token
export function setUser(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
}

// Verify JWT Token
export function getUser(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Invalid token
  }
}
