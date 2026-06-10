"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Order = require("../models/order");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'List Orders'
            #swagger.desription = `
                You can sen query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const result = await res.getModelList(Order);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Order),
      result,
    });
  },

  create: async (req, res) => {
    /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Create Order'
        */

    const result = await Order.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Get Single Order'
        */

    const result = await Order.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Update Order'
        */

    const result = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
            #swagger.tags = ['Orders']
            #swagger.summary = 'Delete Order'
        */

    const result = await Order.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted.",
    });
  },
};
