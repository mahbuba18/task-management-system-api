import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./postgres/postgres.js";
import routes from "./view/routes.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/", routes);

connection(); // Connect to the database


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
