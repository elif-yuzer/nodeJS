


module.exports=(err,req,res,next)=>{

    return res.status(err?.statusCode || 500).send({
        error:true,
        message:err.message,
        cause:err.cause,
        body:req.body
    })
}