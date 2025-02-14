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
const { Client } = pkg;
import router from './view/routes.js';

const app = express();
const PORT = 8000;

// Database connection
const client = new Client({
  host: 'localhost',   
  port: 5432,          
  user: 'postgres',    
  password: 'priya',        
  database: 'task_manager'  
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

// Optionally, close the connection on shutdown
process.on('SIGINT', async () => {
  await client.end();
  console.log('PostgreSQL connection closed.');
  process.exit();
});