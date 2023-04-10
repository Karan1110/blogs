const router = require("express").Router();
const { pool } = require("../startup/db");

router.get("/me", (req,res) => {
    const { name, email, isAdmin, isGold } = pool.query("SELECT * FROM Users where id = ?", [req.body.id]);
    if (!name || !email) return res.status(400).send("User not found.")
    res.send({
        name: name,
        email: email,
        isAdmin: isAdmin,
        isGold: isGold
    });
});

router.post("/new", (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = pool.query("SELECT name FROM Users WHERE name = ?", [req.body.name]);
    if (user) return res.status(400).send("User already exists. Try other name");

    let salt = bcrypt.genSalt();
    password = bcrypt.hash(req.body.password, salt);

    const { name, email, isAdmin, isGold } = pool.query(`
    CREATE TABLE Users(
        id primary key

        name varchar(55),
        email varchar(75), 
        isAdmin boolean, 
        isGold boolean
        );
        INSERT INTO Users(name,email,password,isGold,isAdmin)
        values(?,?,?,?,?);
    `, [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.isAdmin,
        req.body.isGold
    ]);
        let token = jwt.sign({ isAdmin: req.body.isAdmin, id: req.body.id }, config.get("jwtPrivateKey"));
    res
        .header("x-auth-token", token)
        .send(name, email, isAdmin, isGold);
});

router.put("/update", (req, res) => {
    const { name, email, password } = pool.query(`
    SELECT name,email,password FROM Users where id  = ?
    `, [
        req.body.id
    ]);

    const u_password = bcrypt.compare(req.body.password, password);
    if (!u_password) return res.status(400).send("Email or Password not valid.");

    const { new_name, new_email, new_password } = pool.query(`
    UPDATE Userss
    SET name = ?,email=?,password=?
    WHERE id = ?
    `, [
        req.body.name, req.body.email, req.body.password,req.body.id
    ]);

    res.
        status(200)
        .send("Profile updated successfully.", {
            name: new_name,
            email: new_email,
        });
})

router.delete("/delete", (req, res) => {
    const query = pool.query(`
   DELETE Users
   WHERE id = ?
    `, [
        req.body.id
    ]);
    
    res.status(200).send("user deleted successfully");
});