
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (!req.header("x-auth-token")) return res.status(400).send("token not found.");
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        next();
        
    } catch (ex) {
        winston.error(ex.message);
        res.status(500).send("something failed.");
    }
}