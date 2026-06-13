const { default: mongoose } = require("mongoose");
const {
  mongoose: { Schema, model },
} = require("../config/dbConnection");

const { default: uniqueValidator } = require("mongoose-unique-validator");

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  },
);

reservationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Reservation", reservationSchema);
