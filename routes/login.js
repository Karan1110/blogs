const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req,res) => {
   const {rows} =  await pool.query(`
    SELECT id,name,email,isAdmin FROM Users WHERE email = $1
    `, [req.body.email]);

        if (rows[0] === 0) return res.status(400).send("User not found. try signing up instead.");

        const { password } = rows[0];
        const p = await bcrypt.compare(req.body.password, password);
        
       if (!p) return res.status(400).send("invalid credentials.");
        const token = jwt.sign({ id: id, isAdmin: isAdmin }, config.get("jwtPrivateKey"));
        
        res
            .status(200)
            .header('x-auth-token',token)
            .send(rows[0]);
    });
 
module.exports = router;