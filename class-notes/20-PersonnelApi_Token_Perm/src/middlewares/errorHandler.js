"use strict";

const errorHandler = (err, req, res, next) => 
  {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).send({
    err: true,
    message: err.message,
    cause: err.cause,
  });
};

module.exports = errorHandler;
