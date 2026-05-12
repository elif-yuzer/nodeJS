"use strict";

const {mongoose }= require("../configs/dbConncetion");
const { passwordEncrypte } = require("../utils/index");
const personelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
      required: true,
      match: [/^\+?[0-9]{10,15}$/, "Invalid phone number."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      amount: Number,
      currency: String,
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

    role: {
      type: String,
      enum: ["employee", "lead", "admin"],
      default: "employee",
    },

    permissions: {
      canEdit: {
        type: Boolean,
        default: false,
      },
      canDelete: {
        type: Boolean,
        default: false,
      },
      canCreate: {
        type: Boolean,
        default: false,
      },
      canView: {
        type: Boolean,
        default: true,
      },
    },

    startedAt: {
      type: Date,
      //default:Date.now()  //
      default: Date.now,
    },
  },
  { collection: "Personel", timestamps: true },
);

module.exports = mongoose.model("Personel", personelSchema);
