"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const tokenSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },

    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true
    }

}, {
    timestamps: true,
    collection: 'tokens'
});

module.exports = model('Token', tokenSchema);