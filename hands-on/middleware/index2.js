const express = require('express');
const app = express();

// 1. Görevli: Güvenlik
app.use((req, res, next) => {
    console.log("1. Güvenlikten geçildi.");
    next();
});

// 2. Görevli: Bilet Kontrolü
app.use((req, res, next) => {
    console.log("2. Bilet kontrol ediliyor.")
   /*  res.send("okey"); */
   next()
})

// 3. Hedef: Film Salonu (Route)
app.get("/film", (req, res) => {
    console.log("3. Salona girildi.");
    res.send("İyi seyirler!");
});

app.listen(3000);