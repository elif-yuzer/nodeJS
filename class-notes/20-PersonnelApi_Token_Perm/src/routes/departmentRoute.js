"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: Deleted,
} = require("../controllers/departmentController");

const { isAdmin, isLeadorAdmin } = require("../middlewares/permission");

router.route("/").get(list).post(create);

router.route("/:id").get(read).delete(Deleted);

router.route("/:id").put(isLeadorAdmin, update);

module.exports = router;
