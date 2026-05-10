"use strict";

const router = require("express").Router();
const { user } = require("../controllers/userController");

router.route("/").post(user.create);

module.exports = router;
