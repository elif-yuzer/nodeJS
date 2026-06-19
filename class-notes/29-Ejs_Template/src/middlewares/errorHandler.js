'use strict'

module.exports = (err, req, res, next) => {
  const statusCode = res.errStatusCode ?? 500;

  const data = {
    error: true,
    message: err.message,
    cause: err.cause
  }

  if (req.originalUrl.startsWith('/api')) {
    // /api/todos gibi bir URL ise → JSON döndür
    res.status(statusCode).send(data);
  } else {
    // /view gibi bir URL ise → EJS sayfası göster
    res.render('errors', { data })
  }
};