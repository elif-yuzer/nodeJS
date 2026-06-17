"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const categorSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

}, {
    collection: 'categories',
    timestamps: true
});

module.exports = model('Category', categorSchema);