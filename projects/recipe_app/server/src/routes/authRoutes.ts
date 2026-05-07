import express from "express";
import { postUser, UserLogin } from "../controllers/userController";
import verifyJWT from "../middlewares/verifyJWT";



export const router = express.Router()

//register
router.post("/",postUser)


//giriş kısmı 
router.post("/login",UserLogin)

//korumalı ozel oda (guvenlik middleware in kapıda beklediği yer)


router.get("/protected-room", verifyJWT, (req,res)=>{console.log("müşteri bilgisini burdan aldm",req.user)
    res.json({ message: "Korumalı odaya hoş geldin!", user: req.user });
})
