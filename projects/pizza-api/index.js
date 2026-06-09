"use strict";

require("dotenv").config();
const express = require("express");

const {dbConnect} = require("./src/config/dbConnect");
//console.log(express);

const app = express();

const PORT = process.env.PORT ?? 5000;

app.use(express.json());

app.all("/", (req, res) => {
  res.send({
    message: "Welcome to the pizza-api",
  });
});

const server = app.listen(PORT, async () => {

    await dbConnect()
    .then(()=>console.log(`server start on ${PORT}`))
    .catch(()=>{
         console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    })
});
