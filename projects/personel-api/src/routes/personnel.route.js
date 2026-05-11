'use strict'

const { personnel } = require('../controllers/personnel.controller')


const router=require('express').Router()

router.route("/")

.get(personnel.list)
.post(personnel.create)


router.route("/:id").get(personnel.read).put(personnel.update)

module.exports=router