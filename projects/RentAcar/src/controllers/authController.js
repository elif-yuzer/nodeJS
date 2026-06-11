"use strict";

const { CustomError } = require("../helpers/customError");
const comparePassword = require("../helpers/passwordCompare");
const {
  generateAccesstoken,
  generateRefreshtoken,
} = require("../helpers/tokenHelper");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password))
      throw new CustomError(
        "Username or email and password are required.",
        401,
      );

    const foundedUser = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");

    if (!foundedUser)
      throw new CustomError("Incorrect Username/Email or Password.", 401);
 //hashli pass ile karsılastır
    await comparePassword(password, foundedUser.password);

    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active", 401);
    

    const accessToken = generateAccesstoken(foundedUser);
    const refreshToken = generateRefreshtoken(foundedUser);

//*web için token bilgisi cerezle yollandı
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });


    //*mobil için eklendi
    res.setHeader("Authorization", `Bearer ${accessToken}`);

    res.status(200).send({
      error: false,
      user: foundedUser,
      accessToken,
      refreshToken,
      message: "Login successful.",
    });
  },

  logout: (req, res) => {
    res.clearCookie("jwt");
//*mobilden silmek için bu sekılde yazdm
    res.setHeader("Authorization", "");

    res.status(200).send({
      error: false,
      accessToken: null,
      message: "Logout successful.",
    });
  },

  register: async (req, res) => {
    const { username, password, email ,isAdmin} = req.body;
    await User.create(req.body);
    res.status(201).send({
      error: false,
      message: "Register baasarlı",
    });
  },

  refresh: async (req, res, next) => {
    //*musterinin tokeni bitti diyelim kapıma geldi
    //*önce body e sonra cookie bakıyorm ikisinde de yoksa hata fırlatma yapıyorm
    const refresh = req.body.refresh || req.cookies.jwt;
    
    if (!refresh) throw new CustomError("Refresh token is not found", 401);
 //*bileti buldm ama dogrumu bu token bıleti kontrol et env dekı ıle eger bilet token dogruysa musterı bilgisini refreshdata ile müşterinin onune koydum
    jwt.verify(
      refresh,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, refreshData) => {
        if (err) return next(new CustomError(`JWT Error: ${err.message}`, 401));
          //*diyelim bilet dogru cıktı ama bu seferde db den biletin içindeki bilgilerden kullanıcının dogrulugunu bilmem lazım.müşteri tokenı 10 saat once almıs olabilir bu yuzden token içindeki id ile db sorgusu sapıyorm isActive
        const user = await User.findById(refreshData._id);

        if (!user)
          return next(new CustomError("Refresh data is not valid", 401));

        if (!user.isActive) return next(new CustomError("User is banned", 401));


        //*musteri guvenlik testlerinden gectikten sonra yeni accesstoken uret
        const newAccessToken = generateAccesstoken(user);

        res.status(200).send({
          error: false,
          bearer: {
            access: newAccessToken,
          },
        });
      },
    );
  },
};
