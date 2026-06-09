"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm run dev
*/

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// Nested Query
app.set("query parser", "extended");

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// Auhentication:
// app.use(require('./src/middlewares/authentication'));

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

// Logger:
app.use(require("./src/middlewares/logger"));

/* ------------------------------------------------------- */
//* Routes:

// HomePath
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Other path
app.use("/", require("./src/routes/"));

/* ------------------------------------------------------- */
//* Error Handlers

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
  const { dbConnection } = require("./src/configs/dbConnection");
  await dbConnection()
    .then(() => console.log(`running at: http://127.0.0.1:${PORT}`))
    .catch(() => {
      console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    });

  //! seed function
  // require('./src/utils/sync')()
});
