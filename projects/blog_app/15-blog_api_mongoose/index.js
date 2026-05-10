"use strict";
require("dotenv").config();

const express = require("express");

const app = express();

//*herzaman routtan once
app.use(express.json());

/* app.use((req, res, next) => {
  console.log("body:", req.body);
  console.log("headers", req?.headers["content-type"]);
 
}); */

//*route
const blogRouter=require('./src/routes/blogRoutes')

app.use(blogRouter)
/* app.post("/test", (req, res) => {
  res.json({ mesaj: "çalıştı", body: req.body });
}); */

app.all("/", (req, ress) => {
  ress.send("welcome to blog app");
});

app.all("/*splat", (req, res) => {
  const err =  new Error("Route is not found");
  err.statusCode = 404;
  throw err
});

const errorHandler = require("./src/middlewares/errorHandler");

app.use(errorHandler);

const startServer = async () => {
  try {
    await require("./src/config/dbConnect")();

    const PORT = process.env.PORT ?? 3000;

    app.listen(PORT, () => {});

    console.log("server ayakta");
  } catch (error) {
    process.exit(1);
  }
};
startServer();
