"use strict";

module.exports = (err, req, res, next) => {
  const statusCode = res.errStatusCode ?? 500;

  res.status(statusCode).send({
    error: true,
    message: err.message || "Something went wrong",
    cause: err.cause,
    /* geliştirme sırasında gelen hata */
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    // stack: err.stack,
  });
};
