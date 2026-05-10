"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");

/*------------------------------------------------------- */
//* blogCategory Schema

// create schema
// new mongoose.Schema({...atribudes}, {...options})
const categorySchema = new mongoose.Schema(
  {
    // _id

    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogCategories" },
);

// Set model
const Category = mongoose.model("Category", categorySchema);

/*------------------------------------------------------- */

const postSchema = new mongoose.Schema(
  {
    categoryId: {
      //default olarak manyto-one ılıskısı olck
      //burda one to one yapmak ıcın unıque olması lazım yanı aslında her postun bır category ıd ye sahip olması gerekıyorbunun ıcın unique kullanırz. ilişkileri bu sekılde sınıflandırabılrız
      type: mongoose.Schema.Types.ObjectId, //*manytoone default
      ref: "Category",
      required: true,
      //*uniuqe: true, one-to-one a cevirmek için
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },

    content:{
      type:String,
      trim:true,
      required:true,
    },


   
  },
  { collection: "blogPosts", timestamps:true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Category, Post };