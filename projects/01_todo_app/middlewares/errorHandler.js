const errorHandler=(err,req,res,next)=>{
    res.status(400).send({
        error:true,
        message:err.message,
        cause:err.cause,
        stack:err.stack
    })
}

module.exports=errorHandler