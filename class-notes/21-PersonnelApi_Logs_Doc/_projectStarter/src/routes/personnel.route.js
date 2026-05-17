"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require("../controllers/personnel.controller");

const { isLogin, isAdmin } = require("../middlewares/permissions");

// URL: /personnels
router.route("/").get(isAdmin, list).post(isAdmin, create);

router
  .route("/:id")
  .get(isLogin, read)
  .put(isLogin, update)
  .delete(isAdmin, deletee);

module.exports = router;
