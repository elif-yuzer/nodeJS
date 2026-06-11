"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./authRoute"));

/* ------------------------------------------------------- */
module.exports = router;
