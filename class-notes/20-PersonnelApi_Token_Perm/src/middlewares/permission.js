"use strict";


const Personel = require("../models/personelModel");
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
    /* 
    console.log("rol:", req.user?.role);
    console.log("departman:", req.user?.departmentId);
    console.log("gitmek istediği departman:", req.params.id);
 */
    const isAdmin = req.user?.role === "admin";
    const isOwnLead =
      req.user?.role === "lead" &&
      String(req.user?.departmentId) === String(req.params.id);

    if (!isAdmin && !isOwnLead) return deny("Yo cannot authorized");
    next();
  },
  isOwnerorAdmin: (req, res, next) => {
    if (!isAuthenticated(req)) return deny("You must login");

    /*   console.log("rol:", req.user?.role);
    console.log("departman:", req.user?.departmentId);
    console.log("gitmek istediği departman:", req.params.id); */
    const isAdmin = req.user?.role == "admin";
    const isOwner = String(req.user?._id) === String(req.params.id);

    if (!isAdmin && !isOwner) deny("you should be an admin or owner");

    next();
  },

  isLeadwithDeleteRoles: async (req, res, next) => {
    console.log("middleware calııyormu");

    console.log("req.user:", req.user);
    if (!isAuthenticated(req)) {
      console.log("login hata veriyor");
      deny("You must login");
    }
    console.log("logini gecti");

    const isAdmin = req.user?.role == "admin";

    const isLeadandCanDeleteRole =
      req.user?.role == "lead" && req.user.permissions.canDelete == true;
    console.log(isLeadandCanDeleteRole);

    const foundedUser = await Personel.findOne({ userId: req.params._id });

    const sameDepartment =
      String(foundedUser.departmentId) === String(req.user?.departmentId);

    const CanDelete = isAdmin || (sameDepartment && isLeadAndCanDeleteRole);

    if (!CanDelete) deny("you cannot delete");

    console.log("rol:", req.user?.role);
    console.log("rol:", req.user?.permissions?.canDelete);
    console.log("departman:", req.user?.departmentId);

    next();
  },
};
