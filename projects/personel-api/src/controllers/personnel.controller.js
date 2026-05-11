"use strict";

const Personnel = require("../models/personelModel");

module.exports.personnel = {
  list: async (req, res) => {
    const result = await res.getModelList(Personnel);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      data: result,
    });
  },

  read: async (req, res) => {
    const result = await Personnel.findById(req.params.id);

    if (!result) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found.");

      throw new CustomError("Data is not found.", 404);
    }
  },

  create: async (req, res) => {
    const result = await Personnel.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    const result = await Personnel.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Personnel.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found or already deleted.");

      throw new CustomError("Data is not found or already deleted.", 404);
    }

    res.sendStatus(204);
  },
};


