'use strict';

/* ----------------------------------------- *
               Routes
/* ----------------------------------------- */

const router = require("express").Router();

router.route('/')
    .get((req,res)=> res.send({path:'/', method:'get'}))
    .post((req,res)=> res.send({path:'/', method:'post'}))
    .put((req,res)=> res.send({path:'/', method:'put'}))
    .delete((req,res)=> res.send({path:'/', method:'delete'}))


module.exports = router