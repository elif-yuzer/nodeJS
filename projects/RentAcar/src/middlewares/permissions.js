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

  //* cars için
  "car:readAll":{isActive:true}, 
  "car:create":{isAdmin:true},
  "car:update":{isAdmin:true},
  "car:delete":{isAdmin:true},
  "car:availablecar":{isPublish:true},

  //* reservations için
  "reservation:create":{isActive:true}, 
  "reservation:listMy":{isActive:true},
  "reservation:read":{isActive:true},
  "reservation:cancel":{isActive:true},
  "reservation:listAll":{isAdmin:true},
  "reservation:updateStatus":{isAdmin:true},
  "reservation:availableDates":{isAdmin:true},
};

module.exports = PERMISSIONS;
