import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./postgres/postgres.js";
import routes from "./view/routes.js";
import logger from "./logger/logger.js";





dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());




//routes
app.use("/api", routes);

connection(); // Connect to the database

logger.info("Database connection initialized");


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error Handling
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
