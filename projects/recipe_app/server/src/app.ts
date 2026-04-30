import express from "express";

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
connectDB()
const app = express();


console.log(app);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log("start"));
