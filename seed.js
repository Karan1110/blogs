
const winston = require("winston");
const { Client } = require("pg");
const config  = require("config");
const debug = require("debug")("db")

    const client = new Client({
        connectionString: "postgres://unqgsqcj:PwOgL9DnYvPXdz5K_h6Wqddr_C4gGybz@mahmud.db.elephantsql.com/unqgsqcj",
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect()
        .then(() => {
            winston.info("Connected to DB");
        })
        .catch((ex) => {
            debug(ex);
        });


client.query(
    `

CREATE TABLE Users(
id SERIAL PRIMARY KEY,    
name VARCHAR(70),
email VARCHAR(70),
password VARCHAR(70),
isAdmin BOOLEAN,
) 

CREATE TABLE Authors(
    id SERIAL PRIMARY KEY,    
    name VARCHAR(70)
)

CREATE TABLE Blogs(
    id SERIAL PRIMARY KEY,    
    title VARCHAR(70),
    author_id INTEGER REFERENCES Authors(id) ON  DELETE CASCADE ON UPDATE CASCADE
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
)

CREATE TABLE errors (
    id SERIAL PRIMARY KEY,
    level VARCHAR(10) NOT NULL,
    message TEXT NOT NULL,
    meta JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`
    , [], (err, rows) => {
        if (err)
            winston.error(err.message, err);
    });