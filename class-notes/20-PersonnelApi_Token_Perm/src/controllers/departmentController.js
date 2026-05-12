"use strict";

const Department = require("../models/departmentModel");
const { CustomError } = require("../utils");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      //details: await res.getModelListDetails(Department),
      data: result,
    });
  },

  read: async (req, res) => {
    const result = await Department.findById(req.params.id);
    //const result = await Department.findOne({ _id: req.params.id }).exec();

    if (!result) throw new CustomError("Data is not found", 404);

    res.status(200).send({
      error: false,
      data: result,
    });
  },

  create: async (req, res) => {
    if (!req.body.name) throw new CustomError("Name is required", 400);
    const result = await Department.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const data = await Department.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.status(200).send({
      error: false,
      new:data,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Department.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found or already deleted.");

      throw new CustomError("Data is not found or already deleted.", 404);
    }

    res.sendStatus(204);
  },
};
