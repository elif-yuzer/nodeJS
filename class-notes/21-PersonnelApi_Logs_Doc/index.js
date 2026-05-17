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
app.use(require("./src/middlewares/authentication"));

// SessionCookie
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRET_KEY }));

/* ------------------ */
// Logger
// $ npm i morgan
// https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require("morgan");

// app.use(morgan('tiny'));
// app.use(morgan('short'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('combined'));

// Custom log:
const customLog =
  'TIME=":date[clf]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sing=":user-agent" - (:response-time[digits] ms)';
// app.use(morgan(customLog));

// Write to file:
/* 
'r' — Open file for reading. Error if file does not exist.
'r+' — Open file for reading and writing. Error if file does not exist.
'rs' — Open file for reading in synchronous mode.
'rs+' — Open file for reading and writing, synchronous mode.
'w' — Open file for writing. Creates file if not exists, truncates if exists.
'wx' — Like 'w' but fails if file exists (exclusive).
'w+' — Open file for reading and writing. Creates file if not exists, truncates if exists.
'wx+' — Like 'w+' but fails if file exists.
'a' — Open file for appending. Creates file if not exists.
'ax' — Like 'a' but fails if file exists.
'a+' — Open file for reading and appending. Creates file if not exists.
'ax+' — Like 'a+' but fails if file exists.
*/
const fs = require("node:fs");
const morganStream = fs.createWriteStream("./intrologs.log", { flags: "a+" });

app.use(morgan(customLog, { stream: morganStream }));

/* ------------------ */

/* ----------------------------------------- */

// home path
app.all("/", (req, res) => {
  res.send({
    message: "WELCOME TO BLOG API",
    session: req.session,
    user: req.user,
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
