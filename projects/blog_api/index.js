const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;
require("./src/config/db")();
app.use(express.json());

app.all("/", (req, res) => {
  res.send("welcome to blog api");
});

app.use(require("./src/router/blogRouter.js"));


app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, () => console.log("sunucu ayaga kalktı"));
