const mongoose = require("mongoose");
const { default: uniqueValidator } = require("mongoose-unique-validator");
const { type } = require("node:os");

const carSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      //min olması gerekmezmi

      min: 1900,
      validate: {
        validator: function (value) {
          return value <= new Date().getFullYear();
        },
        message: "Year must be between 1900 and current year",
      },
    },
    isAutomatic: {
      type: Boolean,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    isPublish: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      default: [],
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
  { collection: "cars", timestamps: true },
);

(carSchema.plugin(uniqueValidator),
  {
    message: "This {PATH} is already exist",
  });

module.exports = mongoose.model("Car", carSchema);
