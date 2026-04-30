
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    preparation: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    isPublish: { type: Boolean, default: false },
    countOfVisitors: { type:Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  { timestamps: true },
);

export default mongoose.model("Recipe", recipeSchema);


