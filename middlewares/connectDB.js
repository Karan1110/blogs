const { Pool } = require('pg');

const pool = new Pool({
  user: 'hipxtarv',
  host:"queenie.db.elephantsql.com",
  database: 'hipxtarv',
  password: 'HJNz9lmWLVS_V5ZxzGfpEj0Eb-kNMbLF',
  port: 5432,// default port for PostgreSQL,
  ssl: {
    rejectUnauthorized: false
  }
});

const withDBConnection = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return next(err);
    }
    req.db = client;
    release();
    next();
  });
};

module.exports =  withDBConnection ;