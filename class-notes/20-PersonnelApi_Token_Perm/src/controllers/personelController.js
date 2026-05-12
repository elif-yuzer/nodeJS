"use strict";

const Personel = require("../models/personelModel");
console.log(Personel);
const { CustomError } = require("../utils");

module.exports = {
  create: async (req, res) => {
    if (!req.body.departmentId)
      throw new CustomError("department is required", 400);
    const result = await Personel.create({
      ...req.body,
      role: "employee",
      permissions: {
        canEdit: false,
        canDelete: false,
        canCreate: false,
        canView: true,
      },
    });

    res.status(201).send({
      error: false,
      data: result,
    });
  },
  list: async (req, res) => {
    // if(!req.user?.isAdmin) throw new CustomError('You are not authorized.', 401)

    const result = await res.getModelList(Personel);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personel),
      result,
    });
  },

  read: async (req, res) => {
    const data = await Personel.findOne({ _id: req.params.id });
    console.log(result);

    if (!result) {
      throw new CustomError("Data is not found", 404);
    }

    res.status(200).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    if (req.body.role) {
      throw new CustomError("Role cannot be changed", 403);
    }
    const data = await Personel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
      if (!data) throw new CustomError("Data is not found", 404);

    res.status(200).send({
      error: false,
      new: data,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Personel.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found or already deleted.");

      throw new CustomError("Data is not found or already deleted.", 404);
    }

    res.sendStatus(204);
  },
};
