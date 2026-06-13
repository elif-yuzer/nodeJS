"use strict";

const CustomError = require("../helpers/customError");
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// User Controller:

const User = require("../models/userModel");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      result,
    });
  },

  getUserProfile: async (req, res) => {
    const data = await User.findOne({ _id: req.user._id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // Admin değilse güvenlik alanlarını sil
    if (!req.user.isAdmin && req.params.id !== req.user._id.toString()) {
      throw new CustomError("You can only update your own account", 403);
    }
    if (!req.user.isAdmin) {
      delete req.body.isAdmin;
      delete req.body.isStaff;
      delete req.body.isActive;
    }

    console.log(req.user)

    // Admin ise URL'deki id'yi, değilse kendi id'sini kullan
    const _id = req.user.isAdmin ? req.params.id : req.user._id;

    const data = await User.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      returnDocument: "after",
    });

    res.status(202).send({
      error: false,
      data,
    });
  },

  deletee: async (req, res) => {
    // Sadece admin silebilir veya kullanıcı kendini
    if (!req.user.isAdmin && req.user._id.toString() !== req.params.id) {
      return res.status(403).send({
        error: true,
        message: "Forbidden: You can only delete your own account",
      });
    }

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
