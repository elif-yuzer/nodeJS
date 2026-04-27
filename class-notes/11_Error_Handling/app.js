"use strict";

//* TEMEL Başlangıç kodlarımız
// -------------------------------------------------
const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 3000;
// -------------------------------------------------

const ürünler = [
  { id: 1, isim: "Laptop", fiyat: 15000 },
  { id: 2, isim: "Telefon", fiyat: 8000 },
];

app.all("/urun/:id", (req, res) => {
  console.log(req.params.id);
  const id = Number(req.params.id);

  //* ID sayı mı kontrolü:
  if (isNaN(id)) {
    res.errorStatusCode = 400;
    throw new Error("ID sayı olmalıdır");
  }

  const urun = ürünler.find((u) => u.id === id);

  //* Ürün var mı kontrolü
  if (!urun) {
    res.errorStatusCode = 404;
    throw new Error("Ürün bulunamadı");
  }

  res.json(urun);
});

//* Error handler 4 parametreli özel middleware
//! Error handler DAİMA en sonda olmalı
// const Error_Handler = (err, req, res, next) => {
//   console.error('Hata:', err.message);

//   res.json({
//     error: true,
//     message: err.message,
//   });
// };

// app.use(Error_Handler);

app.use((err, req, res, next) => {
  console.error("Hata:", err.message);

  const statusCode = res.errorStatusCode ?? 500;

  res.status(statusCode).json({
    error: true,
    message: err.message,
  });
});

app.listen(PORT, () => console.log("Çalışıyor: www.localhost:" + PORT));
9;
