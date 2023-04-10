const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/connectDB");

router.get('/get', withDBConnection, async (req, res, next) => {
    await req.db.query(
        `
        SELECT * FROM Products LIKE '%$1%';
        `
        , [], (error, r) => {
        if (error) {
            return res.status(400).send("Error fetching user data.");
        }
        if (r.rows.length === 0) {
            return res.status(404).send("User not found.");
        }
        res.send(r[0].rows);
    })
});

router.post('/new', withDBConnection, async (req, res, next) => {
    let dbExist = true;
    await req.db.query(
        `
        SELECT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = '$1';
        `
        , [Products], (error, r) =>  {
        if (error) {
            return res.status(400).send("Error fetching user data.");
            dbExist = false;
        }
            if (r.rows.length === 0) {
                return res.status(404).send("User not found.");
                dbExist = false;
            }
    })
    if (dbExist) await req.db.query(`
     INSERT INTO TABLE Products(name,quantity,properties,description,price);
     VALUES(
        '$1',
        '$1',
        '$1',
        '$1',
        '$1'
     );
     `
    ), [req.body.name, req.body.quantity, req.body.properties, req.body.description, req.body.price],
        (e, r) => {
            if (e) return next(e);
            if (r[0].rows === 0) return res.status(500).send("record not found.")
        };
    else await req.db.query(`
    CREATE TABLE Products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(55),
        quantity TINYINT,
        properties JSON,
        description VARCHAR(75),
        price INT
    );
    INSERT INTO TABLE Products(name,quantity,properties,description,price);
    VALUES(
       '$1',
       '$1',
       '$1',
       '$1',
       '$1'
    );
    `, [req.body.name, req.body.quantity, req.body.properties, req.body.description, req.body.price],
        (e, r) => {
            if (e) return next(e);
            if (r[0].rows === 0) return next(r);
            res.status(200).send(r[0].row)
    })
});