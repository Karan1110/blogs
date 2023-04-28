const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/connectDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get('/me', withDBConnection, async (req, res, next) => {
    
         await req.db.query(`SELECT * FROM Users WHERE id = $1`, [req.body.id], (error, result) => {
             if (error) {
                 return res.status(400).send("Error fetching user data.");
             }
             if (result.rows.length === 0) {
                 return res.status(404).send("User not found.");
             }
             const { name, email, isAdmin, isGold,password } = result.rows[0];
             req.user = { name: name, email:email,isAdmin:isAdmin,isGold:isGold,password:password}
             res.send(req.user);
         });
    });
    
    
router.post("/", withDBConnection, async (req, res, next) => {
    
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(req.body.password, salt);

   await req.db.query(`
      INSERT INTO Users(name, email, password, isGold, isAdmin)
      VALUES (
        '${req.body.name}',
        '${req.body.email}',
        '${password}',
        '${req.body.isGold}',
       ' ${req.body.isAdmin}'
      );
      SELECT * FROM Users WHERE id = $1
    `, [req.body.id],
       (err, result) => {
       if (err) return next(err);
           if (result.rows.length === 0)
               return res.send("sususususususususu fuck");
           const { name, email, password, isGold, isAdmin } = result[0].rows;      
       
       let token = jwt.sign({ isAdmin: req.body.isAdmin, id: req.body.id },config.get("jwtPrivateKey"));
       req.user = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        isGold: req.body.isGold,
        isAdmin: req.body.isAdmin,
      };
       res
           .header("x-auth-token", token)
           .send("sus bro");
   });
});

router.put("/", withDBConnection,async (req, res) => {
   await req.db.query(`
    SELECT name,email,password FROM Users where id  = $1
    `, [
        req.body.id
   ], (e, r) => {
    if (e) return next(e);
    if (r[0].rows.length === 0)
        return next(err);
    });

    const u_password = bcrypt.compare(req.body.password, password);
    if (!u_password) return res.status(400).send("Email or Password not valid.");

    const { new_name, new_email, new_password } = req.db.query(`
     UPDATE Users
    SET name = $1,email=$1,password=$1
    WHERE id = $1;
    `, [
        req.body.name, req.body.email, req.body.password,req.body.id
    ], (e, r) => {
        if (e) return next(e);
        if (r[0].rows.length === 0)
            return next(err);
        res.send(r[0].rows);
    });
})

router.delete("/delete", [withDBConnection],(req, res) => {
    const query = req.db.query(`
   DELETE FROM Users
   WHERE id = $1
    `, [
        req.body.id
    ]);

    res.status(200).send("user deleted successfully");
});

module.exports = router;