"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const { login, logout, refresh } = require("../controllers/auth");
/* ------------------------------------------------------- */
// URL: /auth

router.post("/login", login);
router.post("/logout", logout);
//*post olmasının sebebi req.bodyden alması lazım refresh tokenını
router.post("/refresh", refresh)
/* ------------------------------------------------------- */


module.exports = router;
