import express from 'express';
import { connection } from './postgres/postgres.js';

const app= express();
const PORT = 3000; 


app.listen(PORT,()=>{
  console.log(`Server is running at PORT ${PORT}`)
})

connection();