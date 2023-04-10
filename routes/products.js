const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/connectDB");
const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");

router.get('/get', [withDBConnection,auth], async (req, res, next) => {
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

router.post('/new', [withDBConnection, auth, isAdmin], async (req, res, next) => {
    await req.db.query(`
   
     INSERT INTO TABLE Products(name,properties,description,price);
     VALUES(
        '$1',
        '$1',
        '$1',
        '$1',
        '$1'
     );
     `
        , [
            req.body.name,
            req.body.properties,
            req.body.description,
            req.body.price
        ],
        (e, r) => {
            if (e) return next(e);
            if (r[0].rows === 0) return res.status(500).send("record not found.")
            res
                .status(200)
            send(r[0].rows);

        });
    
});

router.post('/new', [withDBConnection, auth, isAdmin], async (req, res, next) => {
    await req.db.query(`
    UPDATE Products
    SET name = $1,properties = $1,description = $1,price = $1
    WHERE id = $1
     `
        , [
            req.body.name,
            req.body.properties,
            req.body.description,
            req.body.price,
            req.body.name
        ],
        (e, r) => {
            if (e) return next(e);
            if (r[0].rows === 0) return res.status(500).send("record not found.")
            res
                .status(200)
            send(r[0].rows);

        });
    
});