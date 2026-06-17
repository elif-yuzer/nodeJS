"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require('../models/token');
const CustomError = require('../helpers/customError');

module.exports = {
    list: async (req, res) => {

        /*
            #swagger.ignore = true
        */

        const data = await res.getModelList(Token)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Token),
            data
        })
    },
    create: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Token.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Token.findById(req.params.id)

        if (!data) throw new CustomError('Data not found.', 404);

        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.ignore = true
        */

        const data = await Token.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

        if (!data) throw new CustomError('Update failed, something went wrong', 404)

        res.status(200).send({
            error: false,
            data
        })
    },
    deletee: async (req, res) => {

        /*
            #swagger.ignore = true
        */

        const { deletedCount } = await Token.deleteOne({ _id: req.params.id })

        res.status(deletedCount ? 204 : 404).send({
            error: true,
            message: 'Data is not found or already deleted.'
        });
    },
}