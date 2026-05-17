"use strict";
/* -------------------------------------------------------
                EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();

app.set("query parser", "extended");

require("dotenv").config();
const PORT = process.env.PORT;

/* ----------------------------------------- */
// Parse body data
app.use(express.json());

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

// Authentication 
app.use(require('./src/middlewares/authentication'));

// SessionCookie
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRET_KEY }));

/* ----------------------------------------- */

// home path
app.all("/", (req, res) => {
  res.send({
    message: "WELCOME TO BLOG API",
    session: req.session,
    user: req.user
  });
});

app.use("/auth", require("./src/routes/auth.route"));
app.use("/tokens", require("./src/routes/token.route"));
app.use("/departments", require("./src/routes/department.route"));
app.use("/personnels", require("./src/routes/personnel.route"));

/* ----------------------------------------- */
// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error handler
app.use(require("./src/middlewares/errorHandler"));
/* ----------------------------------------- */
const server = app.listen(PORT, async () => {
  // DB Connection
  const { dbConnection } = require("./src/configs/db.connection");
  await dbConnection()
    .then(() => console.log(`running at: http://127.0.0.1:${PORT}`))
    .catch(() => {
      console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    });

    //! seed function
    // require('./src/utils/sync')()
});
