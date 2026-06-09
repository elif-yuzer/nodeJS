"use strict";
const { welcomeTemplate } = require("../helpers/emailTemp");
const sendMail = require("../helpers/sendMail");
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require("../models/user");

module.exports = {
  getUsers: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
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

    const result = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      result,
    });
  },

  createUser: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Create User'
        */

    const result = await User.create(req.body);

    sendMail(
      result.email,
      "Welcome",
      welcomeTemplate({username:result.username,email:result.email})
    );

    res.status(201).send({
      error: false,
      result,
    });
  },

  getUserById: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Get Single User'
        */

    const result = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  updateUserById: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Update User'
        */

    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true, // run validation method
        new: true, // returns updated data
      },
    );

    res.status(202).send({
      error: false,
      result,
    });
  },

  deleteUserById: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Delete User'
        */

    const result = await User.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: true,
      message: "Data is not found or already deleted.",
    });
  },
};
