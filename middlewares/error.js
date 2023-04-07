module.exports = function(err,res,req,next){
    console.log(err.message);
    res.send("Something failed.").status(500);
};