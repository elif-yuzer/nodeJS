"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require("../controllers/department.controller");

const { isAdmin } = require("../middlewares/permissions");

// URL: /departments
router.use(isAdmin)

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(deletee);

module.exports = router;
