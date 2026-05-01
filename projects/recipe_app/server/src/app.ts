import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes/authRoutes";
const app = express();
app.use(express.json())


//*mddlewares

///*routes

app.use("/api/users",router)





app.all("/*splat", (req, res) => {
  res.status(404);
  throw new Error("Route is not found.");
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
