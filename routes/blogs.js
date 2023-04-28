const express = require("express")
const router = express.Router();
const withDBConnection = require("../middlewares/connectDB");

router.get('/blogs', [withDBConnection],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs ;
        `, []
    )
    res
    .status(200)
    .send(rows);
});


router.get('/blogs/:id', [withDBConnection] ,async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs WHERE id = $1 
        
        `, [req.params.id]
    )
    res
    .status(200)
    .send(rows[0]);
});

router.get('/blogs/pagination/', [withDBConnection],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs LIMIT $1 OFFSET $2 
        
        `, [req.query.limit,req.query.offset]
    )
    res
    .status(200)
    .send(rows);
});

router.get('/blogs/pagination/', [withDBConnection],async (req, res) => {
    const { rows } = await req.db.query(
        `
        SELECT * FROM Blogs LIMIT $1 OFFSET $2 
        
        `, [req.query.limit,req.query.offset]
    )
    res
    .status(200)
    .send(rows);
});

router.post('/blogs/post', [withDBConnection],async (req, res) => {
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


router.put('/blogs/update', [withDBConnection],async (req, res) => {
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



router.delete('/blogs/delete/:id', [withDBConnection],async (req, res) => {
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