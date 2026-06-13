const { default: mongoose } = require("mongoose");
const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const { default: uniqueValidator } = require("mongoose-unique-validator");

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    
    


  },
  { collections: "reservations", timestamps: true },
);
