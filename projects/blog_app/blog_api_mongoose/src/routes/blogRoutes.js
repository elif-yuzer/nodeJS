'use strict'
const router=require('express').Router()

const category=require('../controllers/blogController')

router.route("/blogs/categories")
.post(category.create)
.get(category.list)




router.route("/blogs/categories/id/:id").get(category.listById)


router.route("/blogs/categories/name/:name").get(category.listOne)




router.route("/blogs/categories/update/:id").put(category.update)

router.route("/blogs/categories/:id").delete(category.delete)






module.exports=router

