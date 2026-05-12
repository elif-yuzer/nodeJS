"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: Deleted,
} = require("../controllers/personelController");

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(Deleted);

module.exports = router;
