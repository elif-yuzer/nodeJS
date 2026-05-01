import express, { Express, Router } from "express";
import { postUser } from "../controllers/userController";



export const router = express.Router()

router.post("/",postUser)

