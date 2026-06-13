const hasConflicts = require("./hasConflcts");

//db den reservasyon listesini cektim
const reservationsCheck = (existingReservations, requestedReservations) => {
  //* Mevcut reservasyonlar içinde talep edilen tarihlerle çakışan var mı kontrol et
  return existingReservations.some((reservation) =>
    hasConflicts(reservation, requestedReservations),
  );
};

module.exports = reservationsCheck;
