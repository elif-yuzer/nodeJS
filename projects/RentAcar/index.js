'use strict'

const express=require('express')
const app=express()
require('dotenv').config()

const HOST = process.env?.HOST || "127.0.0.1";
const PORT=process.env?.PORT  || 3000 

//nested query:serch,filter vs

/* configurations */
//*connect db
const {dbConnection}=require('./src/config/dbConnection')

dbConnection()

/* middlewares */



// Accept JSON:
app.use(express.json());

// Check Authentication:
//app.use(require("./src/middlewares/authentication"));

// Run Logger:
//app.use(require("./src/middlewares/logger"));

// Query Handler
//app.use(require("./src/middlewares/queryHandler"));


// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to RENT A CAR API",
    documents: {
      swagger: "/document/swagger",
      redoc: "/document/redoc",
      json: "/document/json",
    },
    user: req.user,
  }); 
});

/*//*routes  */
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to RENT A CAR API",
    documents: {
      swagger: "/document/swagger",
      redoc: "/document/redoc",
      json: "/document/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

// not Found
app.all("/*splat", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});



// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
