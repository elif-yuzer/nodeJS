"use strict";

require("dotenv").config();

const express = require("express");
const errorHandler = require("./src/middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT ?? 3500;

app.use(express.json());
app.use(require("./src/middlewares/queryHandler"));
app.use(require("./src/middlewares/authentication"));

app.all("/", (req, res) => {
  res.send({
    message: "WELCOME TO BLOG API",
  });
});

app.use("/auth", require("./src/routes/authRoute"));
app.use("/tokens", require("./src/routes/tokenRoute"));
app.use("/departments", require("./src/routes/departmentRoute"));
app.use("/personels", require("./src/routes/personelRoute"));

//?not found route

app.all("/*splat", (req, res) => {
  const error = new Error("Route is not suitible");
  error.statusCode = 404;
  throw error;
});

app.use(errorHandler);

const server = app.listen(PORT, async () => {
  const { dbConncetion } = require("./src/configs/dbConncetion");

  await dbConncetion()
    .then(() => console.log(`server start on ${PORT}`))
    .catch(() => {
      console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    });
});
