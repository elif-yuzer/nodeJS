import { Response, Request, NextFunction } from "express";
import { UserInfo } from "../services/authService";

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    console.log("➡️ 1. [GARSON] Siparişi aldı, gelen paket:", { firstName, lastName, email, password, role });

    
    const user = await UserInfo(firstName, lastName, email, password)

    res.status(201).json({
      success: true,
      data:user,
    });
  } catch (error) {
    next(error);
  }
};

export {postUser}