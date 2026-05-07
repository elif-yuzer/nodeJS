
import { Response, Request, NextFunction } from "express";
import { UserInfo,handleLogin } from "../services/authService";


import dotenv from 'dotenv'

dotenv.config()



const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    
    const user = await UserInfo(firstName, lastName, email, password)

    res.status(201).json({
      success: true,
      data:user,
    });
  } catch (error) {
    next(error);
  }
};


const UserLogin=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {email,password}=req.body

    const { foundedUser, accessToken, refreshToken } = await handleLogin(email, password);

  
   res.cookie('jwt',refreshToken, {httpOnly:true,maxAge:24*60*60*1000})
    res.json({accessToken})

    
  } catch (error) {
    
    next(error)
  }
}








export {postUser,UserLogin}