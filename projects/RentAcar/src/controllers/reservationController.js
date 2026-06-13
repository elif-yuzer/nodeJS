"use strict";

const Car = require("../models/carModel");
const Reservation = require("../models/rezervationModel");
const CustomError = require("../helpers/customError");
const reservationsCheck = require("../helpers/reservationsCheck");

module.exports = {
  createReservation: async (req, res, next) => {
    const { startDate, endDate, carId } = req.body;
    const userId = req.user?._id;

    if (!startDate || !endDate || !carId) {
      next(new CustomError("startDate, endDate, carId required", 400));
    }
    const availableCar = await Car.findById(carId);
    if (!availableCar) {
     return next(new CustomError("Car is not available", 400));
    }
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // SADECE aktif (pending, confirmed) reservasyonları kontrol et
    const existingReservations = await Reservation.find({
      carId: carId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    const requestedReservation = {
      startDate: startDateObj,
      endDate: endDateObj,
    };

    const hasConflict = reservationsCheck(
      existingReservations,
      requestedReservation,
    );

    if (hasConflict) {
  return next(
    new CustomError(
      "Car is already reserved for these dates",
      400
    )
  );
}
    const reservation = await Reservation.create({
      carId: carId,
      userId: userId,
      createdId: userId,
      updatedId: userId,
      startDate: startDateObj,
      endDate: endDateObj,
    });

    res.status(201).json({
      error: false,
      message: "Reservation created successfully",
      data: {
        _id: reservation._id,
        car: {
          brand: availableCar.brand,
          model: availableCar.model,
          plateNumber: availableCar.plateNumber,
         
        },
        startDate: startDateObj,
        endDate: endDateObj,
        status: reservation.status,
      },
    });
  },
};
