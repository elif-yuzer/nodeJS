import User from "../models/users";
import bcrypt from "bcrypt";

import { BadRequest } from "../utils/error";

type UserRole= "user" | "admin"
export const UserInfo = async (firstName: string, lastName: string, email: string, password: string,role?:UserRole ) => {

  console.log("👨‍🍳 2. [AŞÇI] Mutfakta çalışmaya başladı. Aranacak e-posta:", email);
  
    const user = await User.findOne({ email });

    if (user) {
     throw new BadRequest("Already exist account")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
console.log("🔒 3. [AŞÇI] Şifre başarıyla hashlendi, veritabanına kayıt yapılıyor...");
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role || "user"
    });

    return newUser;
  
};


