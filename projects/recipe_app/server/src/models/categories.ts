import mongoose from "mongoose";


//*yemek tarıflerını gruplamak ısın kullandıgm koleksıyon semam
const categoriesSchema=new mongoose.Schema({
   name:{type:String , required:true},

},
{timestamps:true},

)

export default mongoose.model("Category",categoriesSchema)