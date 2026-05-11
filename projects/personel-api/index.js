"use strict";

require("dotenv").config();

const express = require("express");

const app = express();

app.set("query parser", "extended");

/* -------------------------------------------------------
                EXPRESS - Personnel API
------------------------------------------------------- */

/* ----------------------------------------- */
// DB Connection
const { dbConnection } = require("./src/configs/dbConnection");

/* ----------------------------------------- */
// Parse body data
app.use(express.json());

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

// SessionCookie
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRET_KEY }));

/* ----------------------------------------- */

// home path
app.all("/", (req, res) => {
  res.send({
    message: "WELCOME TO PERSONEL API",
    session: req.session,
  });
});
app.use("/auth", require("./src/routes/authRoute"));
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
const startServer = async () => {
  try {
    await dbConnection();

    const PORT = process.env.PORT;

    app.listen(PORT, () => console.log(`running at: http:127.0.0.1:${PORT}`));
  } catch (error) {
    throw error;

    process.exit(1);
  }
};
startServer();
