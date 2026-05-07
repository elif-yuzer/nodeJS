
import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes/authRoutes";
import morgan from "morgan"
const app = express();
app.use(express.json())

app.use(morgan('dev'))
//*mddlewares

///*routes


//*api naming standardizasyonuna dikkat
app.use("/api/v1/users",router)





app.all("/*splat", (req, res) => {
  res.status(404).send({
    error:true,
    message:'Route is not found'
  })
/*   throw new Error("Route is not found."); */
  
});

//*errorHandler en son

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(); // once db ye baglanmayı bekle

    const PORT = process.env.PORT ?? 3000;

    app.listen(PORT, () => {
    
    });
    console.log("server started");
  } catch (error) {
    console.log("Startup error:", error);
    process.exit(1); //hata varsa serverı dusrdudr
  }
};

startServer();
