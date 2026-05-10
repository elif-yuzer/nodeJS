"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// call models
const { Category, Post } = require("../models/blogModel");

//*module.exports.category burda yaptıgı se aslında module den export ıle ısımlendırdıgı category kısmını routerda dırekt categor.list ,category.update olarak kullanabılır

module.exports.category = {
  list: async (req, res) => {
    const result = await Category.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

  create: async (req, res) => {
    const result = await Category.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    // await Category.findOne({...filter})
    // const result = await Category.findOne({_id: req.params.id})
    const result = await Category.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    // await Category.updateOne({...filter},{...data},{...?options})
    //* response from updateOne : {
    // "acknowledged": true, // if update methods ends successfuly.
    // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
    // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
    // "upsertedCount": 0, // Since nothing was inserted, no new ID.
    // "matchedCount": 1 // number of data matches with our filter.
    // }

    // const result = await Category.updateOne({ _id: req.params.id }, req.body);
    const result = await Category.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
      // new: await Category.findById(req.params.id)
    });
  },

  delete: async (req, res) => {
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted");
    }

    res.sendStatus(204);
  },
};

//?post olayları ıcın

module.exports.post = {
  create: async (req, res) => {
    try {
      const result = await Post.create(req.body);

      res.status(201).send({
        error: false,
        data: result,
      });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error
        res.errStatusCode = 409;
        throw new Error(
          "This categoryId is already used. Each category can only have one post (one-to-one relation).",
        );
      }
      throw err;
    }
  },

  list: async (req, res) => {
    const result = await Post.find();
    res.status(200).send({
      error: false,
      data: result,
    });
  },

  //post read ederken bir populate işlemi yapmam lazım

  read: async (req, res) => {
    //const result = await Post.findById(req.params.id).populate("categoryId");

    // await Post.find({..filter}, {select});
    const result = await Post.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 },
    ).populate("categoryId", "-__v -createdAt -updatedAt");
    res.status(200).send({
      error: false,
      data: result,
    });
  },
  updatebyId: async (req, res) => {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).send({
      error: false,
      data: result,
      // new: await Category.findById(req.params.id)  yukardakı new:true ile aynı ısı yapıyor ama bu db ye tekrar bır ıstek atılıp guncel halı cekılıyor
    });
  },

  delete: async (req, res) => {

    /* deleteOne dondurdugu iki sey var{ deletedCount: 1 } // silindiyse
{ deletedCount: 0 } silinecek kayıt bulunamadıysa  */ /* desttructure ederek donen objeden deletedCount u alıp sorgulama yapıyorm */
    const { deletedCount } = await Post.deleteOne({ _id: req.params.id });
    console.log(deletedCount);

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("DAta is not found or already deleted");
    }

    res.sendStatus(204);
  },
};
