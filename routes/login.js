const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req,res) => {
    await pool.query(`
    SELECT id,name,email,isAdmin FROM Users WHERE email = $1
    `, [req.body.email], (err, r) => {
        if (err) return res.status(500).send("something failed.")
        if (r.results[0].rows === 0) return res.status(400).send("User not found. try signing up instead.");

        const { password } = r[0].rows;
        const p = bcrypt.compare(req.body.password, password);
        
       if (!p) return res.status(400).send("invalid credentials.");
        const token = jwt.sign({ id: id, isAdmin: isAdmin }, config.get("jwtPrivateKey"));
        
        res
            .status(200)
            .send(r[0].rows);
    });
});
 
module.exports = router;