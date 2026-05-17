"use strict";

const { CustomError } = require("../utils");

// Permission Control Middleware:

const isAuthenticated = (req) => req.user && req.user?.isActive;
const deny = (message) => {
  throw new CustomError(`NoPermission: ${message} `, 401);
};

module.exports = {
  isLogin: (req, res, next) => {
    if (!isAuthenticated(req)) deny("You must login.");

    next();
  },
  isAdmin: (req, res, next) => {
    if (!(isAuthenticated(req) && req.user?.isAdmin)) deny("You must be admin.");

    next();
  },
  isAdminOrLead: (req, res, next) => {
    // TODO
    // - if user admin can do anything
    // - if user not admin  but lead can do anything related to his own department
  },
};
