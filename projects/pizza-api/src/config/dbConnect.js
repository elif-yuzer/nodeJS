const { mongoose } = require("mongoose");


const dbConnect=async()=>{
    await mongoose
    .connect(process.env.DB_URI)
    .then(()=>console.log("isconnected?"))
    .catch((err)=>{
        console.log("couldnt connect");
        throw err
    })
}

module.exports={dbConnect}