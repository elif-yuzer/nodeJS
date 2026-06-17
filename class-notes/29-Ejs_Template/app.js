"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

/* ----------------------------------------------------- */
// Template:
// npm i ejs
// https://ejs.co/

app.set("view engine", "ejs");

//default template folder is 7.view

/* ----------------------------------------------------- */
// Middlewares:

// Accept json data
app.use(express.json());

/* ----------------------------------------------------- */
// Routes:

/* app.all("/", (req, res) => {
  // call ejs file in ./views
  // res.render('index.ejs')
  res.render("index");
}); */

app.all("/", (req, res) => {
  res.send({
    message: "Welcome to ExpressJS - TODO Project with Sequelize",
    api: "BASE_URL/api/todos",
    view: "BASE_URL/view",
  });
});

// Todo route
app.use("/api/todos", require("./src/routes/todoRouter"));
app.use("/view", require("./src/routes/todoRouter.view"));

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});
/* ----------------------------------------------------- */
// Error handler
app.use(require("./src/middlewares/errorHandler"));

/* ----------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
