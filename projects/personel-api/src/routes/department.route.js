'use strict'


const router=require('express').Router()

const {list, read, create,update,delete:deletedDepartment} = require('../controllers/department.controller') 


//URL:  /departmentts

router.route('/')
.get(list)
.post(create)


router.route('/:id').get(read).put(update).delete(deletedDepartment)


module.exports=router