'use strict'

const bcrypt=require('bcrypt')

const CustomError = require("./customError")

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (isMatch) {
        return true
    } else {
        throw new CustomError('email or password wrong', 401)
    }
}

module.exports = comparePassword
