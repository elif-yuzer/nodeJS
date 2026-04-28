"use strict";
const express = require("express");
require("dotenv").config();

const app = express();
const sequelize = require("./config/db");

app.use(express.json()); //*default middleware sayesınde postmanden gelen ıstek alındı


//*routes: sayesınde gelen paketi "todos" gorup TodoRoutes ekıbıne aktarıyorm.TodoRoutes(garson)kendı ıcındekı ("/")kok dızını calıstırp paketi oldugu gıbı getAllTodos(metot-ascıya) teslim edeck
const todoRoutes = require('./routes/todoRoutes')

//*app.use("/todos"
// //?Ana Kapı Güvenliği (app.js):buraya app.use("/todos", todoRoutes) yazdım. Bu, güvenliğe şu talimatı verir: "Postman'den URL'sinde /todos yazan bir müşteri gelirse, onu doğrudan todoRoutes odasına yönlendir. O /todos kelimesi bende kalacakİç Oda (todoRoutes.js): Müşteri bu odaya girdiğinde zaten /todos bağlamının içindedir. Bu yüzden garsonlar, odanın giriş noktasını temsil eden kök işareti olan / (bölü) karakterini kullanır..*/
app.use("/todos",todoRoutes)

//*
//?odev defaultta app.js benım montaj hattım muster  /todos adresine gelirse ,garsonum yanı route modulum onu garsona yanı controller modulume yonlendırıyor.Sorudakı mantık eger /kampanyalar gıbı olmayan bır adrese ıstek atılırsa
//?TODO: handle not found routes:*/kayıp esya burosu olusturmalıym

const notFound=require('./middlewares/BulunmayanRota')
app.use(notFound)

const errorHandler=require('./middlewares/errorHandler')
app.use(errorHandler)


const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server started: http://127.0.0.1:${PORT}`);
});
