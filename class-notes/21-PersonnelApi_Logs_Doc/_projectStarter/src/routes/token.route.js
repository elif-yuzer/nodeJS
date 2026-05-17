"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require("../controllers/token.controller");

const { isAdmin } = require("../middlewares/permissions");

// URL: /tokens
router.use(isAdmin);

router.route("/").get(list).post(create);

router.route('/:id').get(read).put(update).delete(deletee);

module.exports = router;
