const express  = require("express");
const app = express();
const winston = require("winston");
require("./startup/logging").default();
require("./startup/routes")(app);
// require('express-async-errors');
app.listen(3000, () => {
 winston.info("running on port 3000")
});