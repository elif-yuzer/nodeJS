"use strict";
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
/* ------------------------------------------------------- *
{
  "username": "test",
  "password": "1234",
  "email": "test@site.com",
  "isActive": true,
  "isStaff": false,
  "isAdmin": false
  }
  /* ------------------------------------------------------- */

const { mongoose } = require("../config/dbConnection");
const bcrypt = require('bcrypt')  
const { default: uniqueValidator } = require("mongoose-unique-validator");

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// User Model:
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      validate: {
        validator: (value) => PASSWORD_REGEX.test(value),
        message:
          "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character",
      },
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address.",
      ],
    },

    firstName: {
      type: String,
      trim: true,
      // required: true,
    },

    lastName: {
      type: String,
      trim: true,
      // required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true },
);

userSchema.plugin(uniqueValidator, {
  message: "This {PATH} is already exist",
});

userSchema.pre("save", async function () {
  //*sifre değişmediyese hashleme
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS || 10),
  );
});

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", userSchema);
