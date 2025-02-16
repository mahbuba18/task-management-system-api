// import express from 'express';
// import { connection } from './postgres/postgres.js';
// import router from './view/routes.js';

// const app= express();
// const PORT = 8000; 

// //middleware
// app.use(router);


// app.listen(PORT,()=>{
//   console.log(`Server is running at PORT ${PORT}`)
// })

// connection();

import express from 'express';
import pkg from 'pg';
import { connection } from './postgres/postgres.js'; 
import router from './view/routes.js';
import cors from 'cors';

const { Client } = pkg;
const app = express();
const PORT = 8000;

// Middleware [to add routes]
app.use(router);
app.use(express.json());
app.use(cors());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});

// Database connection using pg client
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'priya',
  database: 'task_manager'
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL using pg client!'))
  .catch(err => console.error('Connection error', err.stack));

// Initialize Sequelize connection and models
connection().then(() => {
    console.log("Sequelize models are initialized.");
}).catch(err => {
    console.error("Error initializing Sequelize:", err);
});

// Optionally, close the connection on shutdown
process.on('SIGINT', async () => {
  await client.end();
  console.log('PostgreSQL connection closed.');
  process.exit();
});