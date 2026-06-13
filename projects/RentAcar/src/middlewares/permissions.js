const CustomError = require("../helpers/customError");

const isAuthenticated = (req) => req.user && req.user?.isActive;

const deny = (message) => {
  throw new CustomError(`NoPermission: ${message}`, 401);
};


const PERMISSIONS = {
  "user:readSelf": { isActive: true },
  "user:readOther": { isAdmin: true },
  "user:readAll": { isAdmin: true },
  "user:updateSelf":{isActive:true},


  //*cars için
  "car:readAll":{isActive:true}, //!herkes kiralasın
  "car:create":{isAdmin:true}  , //!sadece admin create etsin
  "car:update":{isAdmin:true},
  "car:delete":{isAdmin:true},
  "car:availablecar":{isPublish:true}
};

module.exports = PERMISSIONS;
