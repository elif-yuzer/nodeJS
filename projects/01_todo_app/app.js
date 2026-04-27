"use strict";
const express = require("express");
require("dotenv").config();

const app = express();
const sequelize = require("./config/db");

app.use(express.json()); //*default middleware

const { Sequelize} = require("sequelize");


/* app.all("/",(req,res)=>{
    res.send('welcome to do api')
}) */

    //* list todos :
    app.get('/',async(req,res)=>{
        const todos=await Todo.create({
            title:'todo-title1'
        })

        res.status(201).send({
            error:false,
            data:todos
        })
    })



const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server started: http://127.0.0.1:${PORT}`);
});
