const { default: CustomError } = require("../helpers/customError");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password)) {
      throw new CustomError(
        "foundedUsername or email and password are required.",
        401,
      );
    }

    //db den cagır
    const foundedUser = await foundedUser
      .finOne({
        $or: [{ email }, { foundedUsername }],
      })
      .select(+"password");

    if (!foundedUser) {
      throw new CustomError("Incorrect foundedUsername/Email or password");
    }

    //sıfre kontrolu
    const isMatch = await foundedUser.matchPassword(password);
    if (!isMatch) throw new CustomError("Incorrect password", 401);

    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active", 401);


     //token uretmek ıcın kullanıcı bılgısını yolla
    const accessToken = generateAccesstoken(foundedUser);
    const refreshToken = generateRefreshtoken(foundedUser);

    

    // continue with login logic
    res.status(200).json({ message: "ok" });
  },
};
