"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */ "use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */

    const result = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      result,
    });
  },

  create: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */

    const result = await Token.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */

    const result = await Token.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */

    const result = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true, // run validation method
      new: true, // returns updated data
    });

    res.status(202).send({
      error: false,
      result,
    });
  },

  deletee: async (req, res) => {
    /*
            _swagger.deprecated = true
            #swagger.ignore = true
        */

    const result = await Token.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted.",
    });
  },
};
