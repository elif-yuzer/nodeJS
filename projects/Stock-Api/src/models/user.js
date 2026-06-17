"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
const CustomError = require('../helpers/customError');
const passwordEncrypt = require('../helpers/passwordEncrypt');


/* ------------------------------------------------------- */

const userSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isStaff: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    collection: 'users'
});

// https://mongoosejs.com/docs/middleware.html

userSchema.pre(['save', 'findOneAndUpdate'], function (next) {

    // _update -> for update and this -> create
    const data = this?._update ?? this

    const isEmailValidated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email);
    const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password);

    if (!isEmailValidated && data.email) next(new CustomError('Email is not validated', 400));

    if (!isPasswordValidated && data.password) next(new CustomError('Password is not validated', 400));

    data.password = passwordEncrypt(data.password)

    next()
});



module.exports = model('User', userSchema);