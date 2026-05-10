'use strict'

const errorHandler=(err,req,res,next)=>{

    const statusCode=err.statusCode ??  500
      let msg = err.message;

    res.status(statusCode).send({
        err:true,
        message:msg,
        cause:err.stack,
        stack: process.env?.NODE_ENV==="development" ? err.stack : undefined

    })



}

module.exports=errorHandler