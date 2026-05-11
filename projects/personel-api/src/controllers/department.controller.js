"use strict";

const Department = require("../models/departmentModel");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Department);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Department),
      result,
    });
  },
  read: async (req, res) => {
    const result = await Department.findById(req.params.id);

    if (!result) {
      res.errStatusCode = 404;
      throw new Error("Data is not found.");
    }

    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await Department.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Department.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Department.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted.");
    }

    res.sendStatus(204);
  },
};
