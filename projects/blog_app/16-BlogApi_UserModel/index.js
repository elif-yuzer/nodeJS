"use strict";

require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

app.all("/", (req, res) => {
  console.log("weolcome to blogg app");
  res.send("Welcome to Blog API");
});
//routing

app.use("/blogs/v1", require("./src/routes/blogRouter"));
app.use("/users/v1", require("./src/routes/userRouter"));

//not found route kısmı

app.all("/*splat", (req, res) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  throw err;
});

//errorHandler

const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

const startServer = async () => {
  try {
    await require("./src/utils/dbConnection")();
    const PORT = process.env?.PORT ?? 3000;

    app.listen(PORT, () => {
      console.log("3500 temi dinliyosn");
    });
    console.log("server ayakta");
  } catch (error) {
    process.exit(1);
  }
};
startServer();
