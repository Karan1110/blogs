const { Client } = require("pg");
const config  = require("config");
const winston = require("winston")

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
            winston(ex);
        });


module.exports = (req, res, next) => {
    req.db = client;
    next();
}