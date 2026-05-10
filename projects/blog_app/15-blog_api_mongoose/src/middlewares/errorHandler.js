"use strict";

require("dotenv").config();

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).send({
    err: true,
    message: err.message || "something went wrong",
    cause: err.stack,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
