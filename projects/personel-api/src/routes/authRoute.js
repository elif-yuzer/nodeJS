'use strict'

const router=require('express').Router()

const {login,logout}=require('../controllers/authControllers')


router.post("/login",login)
router.post("/logout", logout);


module.exports = router;