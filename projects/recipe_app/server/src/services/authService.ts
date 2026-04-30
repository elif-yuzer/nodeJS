import User from "../models/users";
import bcrypt from "bcrypt";

const userInfo = async (name: string, email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
