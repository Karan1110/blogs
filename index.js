const express  = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);

app.listen(3000, () => {
 winston.info("running on port 3000")
});