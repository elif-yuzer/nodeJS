require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT=5000







app.listen(PORT,()=>console.log("calıstı"))


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB bağlandı "))
    .catch(err => console.log(err))