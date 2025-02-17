import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./postgres/postgres.js";
import routes from "./view/routes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

connection(); // Connect to the database

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
