import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim:true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

export default mongoose.model("User", usersSchema);
 