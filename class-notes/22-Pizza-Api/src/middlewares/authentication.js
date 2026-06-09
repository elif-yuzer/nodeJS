"use strict";
const jwt = require("jsonwebtoken");
const { CustomError } = require("../helpers/passwordEncrypt");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new CustomError("Unauthorized", 401);

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) throw new CustomError("Access token is required", 401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError")
        throw new CustomError("Access token expired", 401);
      throw new CustomError("Unauthorized", 403);
    }

    req.user = {
      _id: decoded._id,
      isAdmin: decoded.isAdmin,
    };

    next();
  });
};

const authorize = (req, res, next) => {
  if (!req.user.isAdmin)
    throw new CustomError("Forbidden: admin only", 403);
  next();
};

module.exports = { verifyJWT,authorize };