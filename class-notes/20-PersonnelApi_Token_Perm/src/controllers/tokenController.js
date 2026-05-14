"use strict";

const Token = require("../models/tokenmodel");
const { CustomError } = require("../utils");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Token);
    console.log(result);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      result,
    });
  },
  read: async (req, res) => {
    const result = await Token.findById(req.params.id);

    if (!result) throw new CustomError("Data is not found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await Token.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Token.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Token.deleteOne({ _id: req.params.id });

    if (!deletedCount)
      throw new CustomError("Data is not found or already deleted.", 404);

    res.sendStatus(204);
  },
};
