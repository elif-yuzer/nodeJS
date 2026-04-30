import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URI=process.env.MONGODB_URI /* as string | undefined */ //veritabanına baglanmadan kontrol et
const connectDB = async () => {
  try {

     if (!URI) throw new Error("MONGODB_URI not set");
    await mongoose.connect(URI);
    console.log("isconnected");
   
  // already connected
   
  } catch (error) {
    console.log("db err", error);
    process.exit(1); /* baglantı yoksa uygulamayı durdur */
  }
};

export default connectDB;
