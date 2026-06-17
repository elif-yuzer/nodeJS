"use strict"

/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const CustomError = require("../helpers/customError");
// app.use(errorHandler):

module.exports = {
    errorHandler: (err, req, res, next) => {
        return res.status(err.statusCode || 500).send({
            error: true,
            message: err.message,
            cause: err.cause,
            body: req.body
        });
    },
    notFoundHandler: (req, res, next) => {
        next(new CustomError('Route Not Found', 404));
    }
}