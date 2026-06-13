const jwt = require("jsonwebtoken");

const CustomError = require("../helpers/customError");
const PERMISSIONS = require("./permissions");

const verifyJWT = async (req, res, next) => {
  //*kullanıcı dolu gelse bıle burda bos bir etiketle baska birinin yaka kartını takmıs bıle olsa burda onu engellıyorm
  //*kapıdakı guvenlık gorevlısının tek gorevi var bu kısı kım?
  //Bileti varsa UV ışığına tutar, kimliğini okur ve yakasına asar (req.user = {...}).
  //Bileti yoksa veya sahteyse yakasına "Ziyaretçi" yazar (req.user = null) ve onu içeri (next()) gönderir.
  //Kovma işini ise içerideki kapılarda duran Müdür (Permissions) yapar. Müdür sadece req.user objesine bakar: "Eğer burası sadece Adminlere özelse ve req.user null ise, seni buradan kovarım" der. İş bölümü kusursuz işler.
  req.user = null;

  const authHeader = req.headers.authorization || null;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) throw new CustomError("Access token is required", 401);

  //*saf tokenı aldım sımdı tokenı elımdekı token ıle kıyaslayıp env dekı dıcem bu kısı budur yakasına kartı takıcm

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      console.log("JWT ERROR:", error);      // ← ekle
    console.log("DECODED:", decoded);      // ← ekle
    //*bu error jwt ye ait ama js den extend almıs
    if (error) {
      if (error.name === "TokenExpiredError") {
        return next(new CustomError("Access token expired", 401));
      }
      return next(new CustomError("Unauthorized", 403));
    }

    req.user = {
      _id: decoded._id,
      isAdmin: decoded.isAdmin,
      isStaff: decoded.isStaff,
      isActive: decoded.isActive,
    };

    next();
  });
};

const authorize = (permission) => {
  return (req, res, next) => {
    //gırıs yapılmısmı yapılmadıysa hata fırlat

    console.log("req.user:", req.user); // ← ekle
    console.log("permission:", permission); // ← ekle
    console.log("rule:", PERMISSIONS[permission]); // ← ekle
    if (!req.user) {
      return next(new CustomError("Authentication required", 401));
    }

    //kullancı varsa permission tablosundan permissionlarına bak
    const rule = PERMISSIONS[permission];

    if (!rule) {
      return next(new CustomError(`Unknown permission: ${permission}`, 500));
    }

    //*kişi admin ise herseyi yapabilsin
    if (req.user.isAdmin) {
      return next();
    }

    // 5. Kural kontrolü: req.user'ın alanları rule'daki şartları sağlıyor mu?
    const canAccess = Object.keys(rule).every((key) => {
      // rule = { isActive: true }
      // req.user.isActive === true ?
      return req.user[key] === rule[key];
    });

    if (!canAccess) {
      return next(new CustomError(`Permission denied: ${permission}`, 403));
    }

    next();
  };
};

module.exports = { verifyJWT, authorize };
