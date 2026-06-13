const customFilter = (req, res, next) => {
  //*defaultta yayınlanmıs araclarım
  req.customFilter = { isPublish: true };

  //*eger gelen kullanıcı admin veya calısan ise ;

  if (req.user.isAdmin) {
    req.customFilter = {};
  }
  next();
};

module.exports = customFilter;
