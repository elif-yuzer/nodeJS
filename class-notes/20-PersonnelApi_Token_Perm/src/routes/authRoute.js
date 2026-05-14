"use strict";

const router = require("express").Router();

const { login, logout } = require("../controllers/authController");
const { list } = require("../controllers/personelController");
const authMiddleware = require("../middlewares/authentication");
const queryHandler = require("../middlewares/queryHandler");
const authentication = require("../middlewares/authentication");

// URL: /auth
router.post("/login", login);
router.post("/logout", authentication, logout);

module.exports = router;
