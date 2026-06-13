const CustomError = require("../helpers/customError");

const reservationValidate = (req, res, next) => {
  const { startDate, endDate, carId } = req.body;

  if (new Date(startDate) >= new Date(endDate)) {
    return next(new CustomError("Invalid interval"));
  }

  next();
};
