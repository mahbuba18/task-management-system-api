import { getUser } from "../config/auth.js";

export function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  const user = getUser(token.replace("Bearer ", ""));

  if (!user) {
    return res.status(403).json({ error: "Invalid Token" });
  }

  req.user = user; // Attach user data to the request
  next();
}
