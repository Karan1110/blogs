const { Client } = require("pg");
const config = require("config");
const debug = require("debug")("db");

    const client = new Client({
        connectionString: "postgres://unqgsqcj:PwOgL9DnYvPXdz5K_h6Wqddr_C4gGybz@mahmud.db.elephantsql.com/unqgsqcj",
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect()
        .then(() => {
            debug("Connected to DB");
        })
        .catch((ex) => {
            debug(ex);
        });


        const sql = `
        CREATE TABLE errors (
         id SERIAL PRIMARY KEY,
         level VARCHAR(10) NOT NULL,
         message TEXT NOT NULL,
         meta JSONB,
         timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE Users(
        id SERIAL PRIMARY KEY,    
        name VARCHAR(70),
        email VARCHAR(70),
        password VARCHAR(70),
        isAdmin BOOLEAN
        );
        
        CREATE TABLE Authors(
            id SERIAL PRIMARY KEY,    
            name VARCHAR(70)
        );
        
        CREATE TABLE Blogs(
            id SERIAL PRIMARY KEY,    
            title VARCHAR(70),
            author_id INTEGER REFERENCES Authors(id) ON  DELETE CASCADE ON UPDATE CASCADE,
            createdAt TIMESTAMP,
            updatedAt TIMESTAMP
        );
        `;
        
        client.query(sql, [], (err, rows) => {
          if (err) {
            debug(err.message, err);
          } else {
            debug("Tables created successfully.");
          }
        });
        