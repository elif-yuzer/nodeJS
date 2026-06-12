const CustomError = require("../helpers/customError");
 
const isAuthenticated = (req) => req.user && req.user?.isActive;
 
const deny = (message) => {
  throw new CustomError(`NoPermission: ${message}`, 401);
};
 
// ── PERMISSIONS TABLOSU ────────────────────────────────────────────────────
const PERMISSIONS = {
  "user:readSelf": { isActive: true },      // Kendi profili: aktif olması yeterli
  "user:readOther": { isAdmin: true },      // Başka birinin profili: admin olmalı
  "user:readAll": { isAdmin: true },        // Tüm kullanıcılar: admin olmalı
};
 
module.exports = PERMISSIONS;
 