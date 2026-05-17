"use strict";

const { mongoose } = require("../configs/db.connection");
const { passwordEncrypte } = require("../utils");

const personnelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: passwordEncrypte,
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [/^\d{11}$/, "Invalid phone number."],
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

    title: {
      type: String,
      trim: true,
      required: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isLead: {
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now(),
    }
  },
  { collection: "personnels", timestamps: true },
);

module.exports = mongoose.model('Personnel', personnelSchema);