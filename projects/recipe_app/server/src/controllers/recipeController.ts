import Recipe from "../models/recipe";

const getAllRecipe = async (req:any, res:any) => {
  try {
    const recipes  =await Recipe.find();
    res.status(200).json(recipes)

  } catch (error:any) {
    res.status(500).json({message:"Sunucu hatası ", error:error.message})
  }
};

export default getAllRecipe