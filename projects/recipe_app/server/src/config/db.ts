import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("isconnected");

        
        
    } catch (error) {
        console.log("db err",error);
        process.exit(1) /* baglantı yoksa uygulamayı durdur */
    }
}

export default connectDB