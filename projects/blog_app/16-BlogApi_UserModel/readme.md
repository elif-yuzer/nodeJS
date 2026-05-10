## 2 — db/connection.js


1.const mongoose = require('mongoose')
2.const dbConnection = () => {
return mongoose ← return: promise kaybolmasın 3. .connect(process.env.MONGODB_URI) 4. .then(() => console.log('db connected')) 5. .catch(err => console.log(err)) ← err: mongoose fırlatır (err = mongoose'dan gelir,
.catch JS bunu yakalar
)





##   1 - app.js akıs

```js
1. require('dotenv').config() ← .env yükle
2. const express = require("express");
const app = express();
3.json body parse :app.use(express.json())
4. route tanımları
5. app.all("/") tum routıng tanımlarına karsılık gelen mıddleware
6.error handlerdan farklı olan hata tanımlaması olan splat ile fırlatılan bulunmayan route hatası 
7.error handler importu
const errorHandler = require("./src/middlewares/errorHandler");

app.use(errorHandler);
8  app.listen fonksiyonu 
const startServer = async () => {
  try {
    await require("./src/config/dbConnect")();

    const PORT = process.env.PORT ?? 3000;

    app.listen(PORT, () => {});

    console.log("server ayakta");
  } catch (error) {
    process.exit(1);
  }
};
startServer();

```

## 3  - not found routta tanımladıgm err degıskenının error handler mıddleware kısmını duzenleme

```js
1. fonksiyonu tanımla parametreleri ver
2.bır status code tanımla bu routta tanımladgn err dan gelsın degılse mıddleware 500 u atsın
3.res.status(status codeu yukarda tanımladıgın).send({obje ac ve err message cause ve stack ları key value olarak tanımla})
4.export
```
