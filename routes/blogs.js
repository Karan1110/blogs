const express = require("express")
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.get('/blogs', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs ;
        `, []
    )
    res
    .status(200)
    .send(rows);
});


router.get('/blogs/:id', [auth,
isAdmin
] ,async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs WHERE id = $1 
        
        `, [req.params.id]
    )
    res
    .status(200)
    .send(rows[0]);
});

router.get('/blogs/pagination/', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs LIMIT $1 OFFSET $2 
        
        `, [req.query.limit,req.query.offset]
    )
    res
    .status(200)
    .send(rows);
});

router.get('/blogs/pagination/', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs LIMIT $1 OFFSET $2 
        
        `, [req.query.limit,req.query.offset]
    )
    res
    .status(200)
    .send(rows);
});

router.post('/blogs/post', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
       INSERT INTO Blogs(title,author,createdAt)
       VALUES($1,$2,$3) 
       
       RETURNING *
        
        `, [req.body.title,req.body.author,req.body.createdAt]
    )
    res
    .status(201)
    .send(rows[0]);
});


router.put('/blogs/update', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
      UPDATE Blogs
      SET title=$1,
          author=$2,
          updatedAt=$3
      WHERE id = $4

    RETURNING *
        
        
        `, [req.body.title,req.body.author,Date.now(),req.params.id]
    )
    res
    .status(200)
    .send(rows[0]);
});



router.delete('/blogs/delete/:id', [auth,
isAdmin
],async (req, res) => {
    const { rows } = await req.db.query(
        `
      DELETE FROM Blogs
      WHERE id = $1
        
        `, [req.params.id]
    )
    res
    .status(200)
    .send(rows[0]);
});

module.exports = router;