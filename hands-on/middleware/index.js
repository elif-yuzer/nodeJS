const express = require("express");
const app = express();

console.log("sataart");
const data = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
];

/* 🧠 1. “res.send cycle’ı bitirir mi?”

✔ Evet.

Ama doğru ifade şu:

res.send() → o request’in lifecycle’ını bitirir

❌ Tüm server’ı bitirmez
❌ Diğer istekleri durdurmaz
❌ Middleware’leri global olarak kapatmaz */


app.use((req, res, next) => {
  console.log("1.midlleware");

  next();
});
app.get("/", (req, res,next) => {
  console.log("🟢 ROUTE HANDLER");
 /*  res.send({
    error: false,
    data: data,
  }); */

  next()
});


app.use((req, res) => {
  console.log("404 hit");
  res.status(404).send("not found");
});


app.use((req, res, next) => {
  console.log("method", req.method);
  console.log("2.midllewate");
  console.log(req.url);
  res.send({
    error: false,
    data: data,
  });
});







app.listen(3000, () => {
  console.log("Server çalışıyor");
});
