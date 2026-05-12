const { mongoose } = require("mongoose");

const dbConncetion = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("isconnceted"))
    .catch((err) => {
      console.log("couldnt connect");
      throw err;
    });
};


module.exports={dbConncetion,mongoose}