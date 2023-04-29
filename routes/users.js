const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/withDBConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");


router.get('/me',[auth,isAdmin], async (req, res, next) => {
    
    await req.db.query(`SELECT * FROM Users WHERE id = $1`, [req.body.id])

             const { name, email, isAdmin} = rows[0];
             res.send(req.user);
    });
    
    
router.post("/",[auth,isAdmin], async (req, res, next) => {
    
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(req.body.password, salt);

   const {rows} =  await req.db.query(`
      INSERT INTO Users(name, email, password, isAdmin)
      VALUES (
        '${req.body.name}',
        '${req.body.email}',
        '${password}',
        '${req.body.isAdmin}'
      )

      RETURNING *
    `, []
   );

        if (rows.length === 0)
               return res.send("not found, 404");     
       
    let token = jwt.sign(
        { isAdmin: req.body.isAdmin, id: req.body.id },
         config.get("jwtPrivateKey")
    );
    
       res
           .header("x-auth-token", token)
           .send(token);
   });

router.put("/:id", [auth,isAdmin],async (req, res) => {
  const {rows} =  await req.db.query(`
    SELECT password FROM Users where id  = $1
    `, [
        req.params.id
  ])
      
    if (rows[0].length === 0)
        return next("not found, 404");


    const u_password = bcrypt.compare(req.body.password, password);
    if (!u_password) return res.status(400).send("Email or Password not valid.");

    const { new_name, new_email, new_password } =  await req.db.query(`
     UPDATE Users
    SET name = $1,email=$1,password=$1
    WHERE id = $1;
    `, [
        req.body.name, req.body.email, req.body.password,req.body.id
    ]);


    res.status(200).send(rows[0].rows);

})

router.delete("/delete/:id", [auth,isAdmin],async (req, res) => {
  await req.db.query(`
   DELETE FROM Users
   WHERE id = $1
    `, [
        req.params.id
    ]);

    res.status(200).send("user deleted successfully");
});

module.exports = router;