import dotenv from "dotenv";
import User from "../models/users";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import { BadRequest } from "../utils/error";

dotenv.config();

type UserRole = "user" | "admin";
export const UserInfo = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role?: UserRole,
) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequest("Already exist account");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: role || "user",
  });

  return newUser;
};

export const handleLogin = async (email: string, password: string) => {
  /* email yoksa mongoose hata fırlatmaz null doner */


  //*SELECT * FROM users WHERE email = '...' LIMIT 1
  const foundedUser = await User.findOne({ email });

  //kullanıcıyı kontrol et
  //securtiy acısından guvenlık acıgı olusturmamak ıcın hata kontrolu fırlatılan hata onemlı
  if (!foundedUser) {
    throw new BadRequest("Invalid email or password");
  }
  //gelen sıfre ile db dekı hashlı sıfre matchmı kontrol et
  const matchPass = await bcrypt.compare(password, foundedUser.password);

  if (!matchPass) {
    throw new BadRequest("Invalid email or password");
  }

   const  accessToken=Jwt.sign(
      {"_id":foundedUser._id,"role":foundedUser.role},
      process.env.ACCESS_TOKEN_SECRET as string,
      {expiresIn:'30m'}
    )
   const  refreshToken=Jwt.sign(
      {"_id":foundedUser._id,"role":foundedUser.role},
      process.env.REFRESH_TOKEN_SECRET as string,
      {expiresIn:'1d'}
    )

  return {foundedUser,accessToken,refreshToken}
};
