"use strict";

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogCategories" },
);


//set model
const Category=mongoose.model("Category",categorySchema)

module.exports = { Category };


/* -------------------------------------------------------*
//* Sample
// Create Schema
// new mongoose.Schema({fields}, {options})

const nameSchema = new mongoose.Schema({

    //_id: // auto created and increment

    fieldName1: Number, // Short hand usage
    fieldName2: Boolean,

    fieldName3: {
        type: String, // JS Data type
        default: null,
        trim: true, // Cuts the space before & after.
        unique: true, // Make it faster reachable in search.
        select: false, // if we dont want to send this field.
        index: true,
        // required: true,
        required: [true, 'custom error message'],
        // enum: ['1', '2,', '3'],
        // enum: [1, 2, 3],
        enum: [[1, 2, 3], 'custom error message'],
        // validate: () => true, // if returns false it will throw a validation error.
        validate: [() => true, 'custom error message'],
        get: () => { return data }, // it works default when we do read operation
        set: () => { return data } // it works default when we do create or update operations
    }

}, {
    collection: 'collectionName', // Table name
    timestamps: true // createdAt & updatedAt
});

// Convert Schema to Model
// mongoose.model('ModelName', nameSchema)

const ModelName = mongoose.model('ModelName', nameSchema);
/*------------------------------------------------------- */