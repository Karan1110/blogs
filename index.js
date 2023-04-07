const express  = require("express");
const app = express();
// const error = 

app.use(express.urlencoded({extended:true}))
// app.use()


const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  user: 'hipxtarv',
  // host: 'postgres://hipxtarv:HJNz9lmWLVS_V5ZxzGfpEj0Eb-kNMbLF@queenie.db.elephantsql.com/hipxtarv',
  host:"queenie.db.elephantsql.com",
  database: 'hipxtarv',
  password: 'HJNz9lmWLVS_V5ZxzGfpEj0Eb-kNMbLF',
  port: 5432,// default port for PostgreSQL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    return;
  }

  console.log('Connected to PostgreSQL database');

  // Release the client back to the pool
  release();
});


app.listen(3000,()=>{
console.log("running on port 3000")
})