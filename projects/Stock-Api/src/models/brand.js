"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const brandSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: {
        type: String,
        trim: true,
    }

}, {
    collection: 'brands',
    timestamps: true
});

module.exports = model('Brand', brandSchema);