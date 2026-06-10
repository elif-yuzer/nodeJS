const { default: mongoose } = require("mongoose");
const { type } = require("node:os");

const Car = new mongoose.Schema(
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

      min: new Date().getFullYear(),
      validate:{
        validator:function(value){
            return values<=new Date.getFullYear()
        }
      }
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
  },
  { collection: Car, timestamps: true },
);

carSchema.plugin(uniqueValidator) , {
    
}
