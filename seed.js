const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/connectDB");
const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");

router.post('/get', [withDBConnection,auth], async (req, res, next) => {
    await req.db.query(
        `
        CREATE TABLE Products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(55),
            properties_id INT,
            FOREIGN KEY (properties_id) REFERENCES properties(id),
            description VARCHAR(75),
            price INT
        );
        CREATE TABLE Products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(55),
        );
        CREATE TABLE Orders(
            id SERIAL PRIMARY KEY,
            product_id,
            FOREIN KEY(product_id) REFERENCES products(id),
            status_id,
            FOREIN KEY(status_id) REFERENCES status(id)
        );
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