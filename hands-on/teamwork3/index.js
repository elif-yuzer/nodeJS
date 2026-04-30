//?10.Query parametre olarak geçilen iki sayının toplamını hesaplayan bir Express.js fonksiyonu yaz.

  const express=require('express')
  require('dotenv').config()
  const PORT=3000
  const app=express()
  console.log("start");

  app.get("/topla",(req,res,next)=>{
    try {
        
        const sayi1=req.query.sayi1
        const sayi2=req.query.sayi2

        if(!sayi1 || !sayi2) {
           
            throw new Error("sayi lazim")
            
        }
        const sonuc=Number(sayi1)+ Number(sayi2)

       res.json({sonuc:sonuc})



       
    } catch (error) {
        next(error)
    }

  })


  //?/abc veya /acd yolunu eşleştiren bir router yaz.

app.get(/a(bc|cd)/, (req, res,) => {

    res.send('eslesti')

})


//? /a(herhangi bir tek rakam)/ ardından 2 kez c veya 3 kez c ile eşleşen bir router yaz./a(herhangi bir tek rakam)/ ardından 2 kez c veya 3 kez c ile eşleşen bir router yaz.

app.get(/a\dc{2,3}/, (req, res) => {
    res.send("eşleşti!")
})


//?Hello" ile bitmesi zorunlu olan ve öncesinde herhangi bir karakterden herhangi bir sayıda olabilen route'ları yaz.



app.get(/.*Hello$/,(req,res)=>{
    res.send("eşleşti!")
})


//?Türkçesi: "Hello" ile bitmeli ve öncesinde hiçbir karakter olmamalı.
app.get(/^Hello$/,(req,res)=>{
    res.send("eşleşti!")
})


  app.listen(PORT,()=>console.log("server ayakta"))



//*"use strict";

const express = require("express");
const app = express();
const router = express.Router();

const students = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Steve" },
    { id: 3, name: "John" }
];

// Tüm öğrencileri döndür
router.get("/students", (req, res) => {
    res.json(students);
});

// İstenen öğrenciyi döndür
router.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ error: "Öğrenci bulunamadı" });
    }

    res.json(student);
});

app.use(router);
app.listen(3000, () => console.log("Server çalışıyor"));