"use strict";
const { CustomError } = require("../utils/index");

const isAuthenticated = (req) => req.user && req.user?.isActive;

const deny = (message) => {
  throw new CustomError(`NoPermission: ${message}`, 401);
};

module.exports = {
  isLogin: (req, res, next) => {
    if (!isAuthenticated(req)) deny("You must login");
    next();
  },
  isAdmin: (req, res, next) => {
    if (!(isAuthenticated(req) && req.user?.role === "admin"))
      deny("You must be admin.");

    next();
  },
  isLeadorAdmin: (req, res, next) => {
    if (!isAuthenticated(req)) return deny("You must login");

    console.log("rol:", req.user?.role);
    console.log("departman:", req.user?.departmentId);
    console.log("gitmek istediği departm:", req.params.id);

    const isAdmin = req.user?.role === "admin";
    const isOwnLead =
      req.user?.role === "lead" &&
      String(req.user?.departmentId) === String(req.params.id);

    if (!isAdmin && !isOwnLead) return deny("Yo cannot authorized");
    next();
  },
};
