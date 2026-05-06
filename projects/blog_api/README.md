# 🚀 Express + MongoDB Backend — Flow & Mimari

## 📌 Genel Akış

```
CLIENT (Postman / Frontend)
        ↓
    ROUTER  →  URL eşleştirme
        ↓
  MIDDLEWARE  →  Auth, Validation, Error
        ↓
  CONTROLLER  →  İş mantığı
        ↓
    MODEL  →  Mongoose Schema
        ↓
  DATABASE  →  MongoDB
        ↓
    RESPONSE  →  JSON
```

---

## 🗂️ Klasör Yapısı

```
project/
├── src/
│   ├── config/
│   │   └── db.js           → MongoDB bağlantısı
│   ├── models/
│   │   └── blogModel.js    → Mongoose Schema + Model
│   ├── controllers/
│   │   └── blogController.js → CRUD fonksiyonları
│   ├── router/
│   │   └── blogRouter.js   → Endpoint tanımları
│   └── middlewares/
│       └── errorHandler.js → Global hata yakalama
├── .env                    → Gizli değişkenler (PORT, MONGO_URI)
└── index.js                → Uygulamanın giriş noktası
```

---

## ⚙️ Katmanlar

### 1. `index.js` — Ana Merkez

Tüm katmanları bir araya getirir.

```js
require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./src/config/db");

dbConnection(); // DB bağlan
app.use(express.json()); // JSON body parse
app.use(require("./src/router/blogRouter")); // Router bağla
app.use(require("./src/middlewares/errorHandler")); // Hata yakala

app.listen(process.env.PORT, () => console.log("Sunucu ayağa kalktı"));
```

---

### 2. `config/db.js` — Veritabanı Bağlantısı

```js
const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/blog-app")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB bağlantı hatası:", err));
};

module.exports = dbConnection;
```

> ⚠️ `dbConnection` fonksiyon olarak export edilir, çağrılmadan çalışmaz!

---

### 3. `models/blogModel.js` — Mongoose Schema

```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
  },
  { collection: "blogCategories" },
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category; // ✅ Direkt export — { Category } KULLANMA!
```

> ⚠️ `module.exports = { Category }` yanlış → `.find()` ve `.create()` çalışmaz!

---

### 4. `controllers/blogController.js` — CRUD

```js
const Category = require("../models/blogModel");

module.exports = {
  list: async (req, res) => {
    const result = await Category.find();
    res.status(200).send({ error: false, data: result });
  },

  create: async (req, res) => {
    const result = await Category.create(req.body);
    res.status(201).send({ error: false, data: result });
  },

  read: async (req, res) => {
    const result = await Category.findById(req.params.id);
    res.status(200).send({ error: false, data: result });
  },

  update: async (req, res) => {
    const result = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Güncel veriyi döndür
      runValidators: true, // Schema kurallarını uygula
    });
    res.status(200).send({ error: false, data: result });
  },

  delete: async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).send({ error: false, message: "Silindi" });
  },
};
```

---

### 5. `router/blogRouter.js` — Endpoint Tanımları

```js
const router = require("express").Router();
const category = require("../controllers/blogController");

router.route("/blog/categories").get(category.list).post(category.create);

router
  .route("/blog/categories/:id")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);

module.exports = router;
```

---

### 6. `middlewares/errorHandler.js` — Global Hata Yakalayıcı

```js
module.exports = (err, req, res, next) => {
  res.status(err.status || 400).send({
    error: true,
    message: err.message || "hata",
    stack: err.stack,
  });
};
```

---

## 🧪 API Test (REST Client)

```
@baseUrl = http://127.0.0.1:5002

### Tüm Kategoriler
GET {{baseUrl}}/blog/categories

### Yeni Kategori
POST {{baseUrl}}/blog/categories
Content-Type: application/json

{ "name": "Tech" }

### Tek Kategori
GET {{baseUrl}}/blog/categories/:id

### Güncelle
PUT {{baseUrl}}/blog/categories/:id
Content-Type: application/json

{ "name": "Updated Name" }

### Sil
DELETE {{baseUrl}}/blog/categories/:id
```

---

## ⚠️ En Sık Yapılan Hatalar

| Hata                                | Sebep                       | Çözüm                                 |
| ----------------------------------- | --------------------------- | ------------------------------------- |
| `Category.find is not a function`   | Model yanlış export edilmiş | `module.exports = Category` kullan    |
| `Category.create is not a function` | `{ Category }` ile export   | Süslü parantezi kaldır                |
| `Cannot GET /blog/categories`       | Route tanımlanmamış         | Router dosyasını app'e bağla          |
| `ECONNREFUSED 127.0.0.1:27017`      | MongoDB servisi çalışmıyor  | Servisi başlat ya da Atlas URI kullan |
| `dbConnection is not called`        | Fonksiyon çağrılmamış       | `dbConnection()` şeklinde çağır       |

---

## 💡 Süslü Parantez `{}` Farkı

```js
// ✅ Direkt export — Category bir Mongoose Model
module.exports = Category;
const Category = require("./model"); // direkt model gelir

// ❌ Object export — Category bir object içinde
module.exports = { Category };
const { Category } = require("./model"); // destructure gerekir
// veya: Category.Category.find() — YANLIŞ KULLANIM
```

---

## 🔗 .env Örneği

```
PORT=5002
MONGO_URI=mongodb://localhost:27017/blog-app
```

---

## 📊 Request Akış Özeti

```
GET /blog/categories
      ↓
  Router → .get(category.list)
      ↓
  Controller → list()
      ↓
  Model → Category.find()
      ↓
  MongoDB → blogCategories collection
      ↓
  Response → { error: false, data: [...] }
```
