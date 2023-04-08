const express  = require("express");
const app = express();
const error = require("./middlewares/error");
 require("./startup/db")();
require("./startup/routes")(app);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(error);

app.listen(3000, () => {
  console.log("running on port 3000")
});