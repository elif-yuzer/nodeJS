"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const firmSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    address: {
        type: String,
        trim: true,
        required: true,
    },

    image: {
        type: String,
        trim: true,
    }

}, {
    collection: 'firms',
    timestamps: true
});

module.exports = model('Firm', firmSchema);