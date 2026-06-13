"use strict";

const CustomError = require("../helpers/customError");
const Car = require("../models/carModel");
const getModelList = require("../middlewares/queryHandler")

module.exports = {
  listCars: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "List Cars"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */
    const data = await Car.getModelList(Car, req.customfilter, [
      { path: "createdId", select: "username email" },
      { path: "updatedId", select: "username email" },
    ]);
    console.log(Car);
    console.log(typeof Car.getModelList);
    console.log(data);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car, req.customFilter),
      data,
    });
  },
  

  readCar: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "Get Single Car"
    */
    const data = await Car.findOne({ _id: req.params.id }).populate([
      { path: "createdId", select: "username email" },
      { path: "updatedId", select: "username email" },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },
  createCar: async (req, res) => {
    /*
      #swagger.tags = ["Cars"]
      #swagger.summary = "Create Car"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            $ref: "#/definitions/Car"
        }
      }
    */
    //*current userid ve updatei ekleme
    const currentUserId = req.user._id;
    req.body.createdId = currentUserId;
    req.body.updatedId = currentUserId;

    const data = await Car.create(req.body);
    res.status(202).send({
      error: false,
      data,
    });
  },

  /* update: async (req, res) => {
    // Admin değilse güvenlik alanlarını sil
    if (!req.user.isAdmin && req.params.id !== req.user._id.toString()) {
      throw new CustomError("You can only update your own account", 403);
    }
    if (!req.user.isAdmin) {
      delete req.body.isAdmin;
      delete req.body.isStaff;
      delete req.body.isActive;
    }

    console.log(req.user);

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
  }, */
};
