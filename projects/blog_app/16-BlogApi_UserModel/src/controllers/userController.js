"use  strict";

const Users = require("../models/userModel");

module.exports.user = {
  create: async (req, res) => {
    const result = await Users.create(req.body);

    res.status(201).send({
      error: false,
      data: result,
    });
  },
};
