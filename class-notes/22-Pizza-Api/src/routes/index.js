"use strict"



/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()

const { verifyJWT } = require("../middlewares/authentication")

/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
//*burda bir protected yapı olusturdm yanı kullanıcı gırıs yaptıktan sonra get post delete vs işlmelerini yapabilecek
router.use('/users',  require('./user'))
// token:


// order:
router.use('/orders',verifyJWT, require('./order'))
// pizza:
router.use('/pizzas',verifyJWT, require('./pizza'))
// topping:
router.use('/toppings', require('./topping'))

// document:
router.use('/documents',verifyJWT, require('./document'))

/* ------------------------------------------------------- */
module.exports = router