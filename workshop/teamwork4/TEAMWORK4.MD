#  ORM & Sequelize Workshop — Türkçe Cevaplar

INTRODUCTION

MVC (Model-View-Controller) is a software architectural pattern commonly used for developing user
interfaces. Sequelize is an ORM (Object-Relational Mapping) library for Node.js that makes it easy to work with
relational databases. We will try to reinforce both with this study.

***

Model-View-Controller (MVC), kullanıcı arayüzleri geliştirmek için yaygın olarak kullanılan bir yazılım mimari desenidir.

Sequelize
 ise Node.js için geliştirilmiş bir ORM (Object-Relational Mapping) kütüphanesidir ve ilişkisel veritabanlarıyla çalışmayı kolaylaştırır.
---

##  BÖLÜM 1: Workshop Soruları

---

### Soru 1 — MVC ve Restoran Analojisi

> **Senaryo:** Bir restorana gittiğinizi düşünün. Sipariş veriyorsunuz, garson mutfağa iletip yemek geliyor.

| Restoran Rolü                     | MVC Karşılığı  | Açıklama                                                                                |
| --------------------------------- | -------------- | --------------------------------------------------------------------------------------- |
|  **Aşçı**                       | **Model**      | Veriyi (malzemeleri) işler, iş mantığını yürütür, yemeği hazırlar                       |
|  **Garson**                     | **Controller** | Kullanıcı ile model arasında köprü kurar; siparişi alır, mutfağa iletir, yemeği getirir |
|  **Servis edilen yemek / Masa** | **View**       | Kullanıcının gördüğü son çıktıdır (arayüz)                                              |

**Özet:**

- **Model** → Veri katmanı (veritabanı işlemleri, iş kuralları)
- **View** → Sunum katmanı (HTML, JSON çıktısı, kullanıcı arayüzü)
- **Controller** → Kontrol katmanı (istekleri karşılar, model & view'ı yönetir)

---

### Soru 2 — Model Nedir ve Express.js'te Neden Önemlidir?

**Model**, bir uygulamada **veri yapısını** ve **iş mantığını** temsil eden katmandır.

Express.js'te Model'in önemi:

- **Veri yönetimi:** Veritabanındaki tablolara/koleksiyonlara karşılık gelir.
- **Tekrar kullanılabilirlik:** Aynı veri işleme kodu birden fazla route'ta kullanılabilir.
- **Separation of Concerns (Sorumlulukların Ayrılması):** Route (controller) katmanı şişmez, kod temiz kalır.
- **Doğrulama (Validation):** Verinin veritabanına gitmeden önce doğrulanmasını sağlar.

```js
// Örnek: Sequelize ile bir User modeli
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.CHAR,
  },
});
```

---

### Soru 3 — ORM (Object-Relational Mapping) Nedir?

**ORM**, ilişkisel veritabanı tablolarını **nesne yönelimli programlama nesnelerine** (class/object) dönüştüren bir tekniktir.

| Özellik         | Açıklama                                                                               |
| --------------- | -------------------------------------------------------------------------------------- |
| **Ne yapar?**   | SQL sorguları yazmak yerine JS/Python/vb. nesneleri üzerinden DB işlemi yapmanı sağlar |
| **Avantajı**    | SQL bilgisi gerektirmez; kod daha okunabilir ve taşınabilir olur                       |
| **Dezavantajı** | Karmaşık sorgularda saf SQL kadar performanslı olmayabilir                             |

```
SQL:   SELECT * FROM users WHERE status = 'A';
ORM:   User.findAll({ where: { status: 'A' } });
```

---

### Soru 4 — Sequelize Nedir ve Ne Zaman Kullanılır?

**Sequelize**, Node.js için geliştirilmiş, **Promise tabanlı** bir ORM kütüphanesidir.

**Desteklediği veritabanları:**

- PostgreSQL
- MySQL
- SQLite
- MariaDB
- Microsoft SQL Server

**Ne zaman kullanılır?**

- Node.js/Express projesinde ilişkisel veritabanıyla çalışırken
- SQL sorguları yerine JavaScript koduyla DB işlemi yapmak istendiğinde
- Model tanımları, migration ve association (ilişki) yönetimi gerektiğinde

```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("veritabani", "kullanici", "sifre", {
  host: "localhost",
  dialect: "mysql",
});
```

---

### Soru 5 — Sequelize'de Temel CRUD İşlemleri

####  CREATE (Oluşturma)

```js
const user = await User.create({
  user_id: "bcd001",
  age: 45,
  status: "A",
});
```

####  READ (Okuma)

```js
// Tüm kayıtlar
const users = await User.findAll();

// Koşullu
const activeUsers = await User.findAll({
  where: { status: "A" },
});

// Tek kayıt
const user = await User.findOne({ where: { id: 1 } });
```

####  UPDATE (Güncelleme)

```js
UPDATE Users
SET status = 'C'
WHERE age > 25;
await User.update({ status: "C" }, { where: { age: { [Op.gt]: 25 } } });
```

####  DELETE (Silme)

```js
await User.destroy({
  where: { status: "D" },
});
```

---

##  BÖLÜM 2: Teamwork — SQL → MongoDB Dönüşümleri

> Aşağıdaki tabloda SQL sorgularının MongoDB karşılıkları verilmiştir.

---

### 1. Tüm kayıtları getir

```sql
SELECT * FROM people
```

```js
db.people.find({});
```

---

### 2. Belirli alanları seç (id, user_id, status)

```sql
SELECT id, user_id, status FROM people
```

```js
db.people.find({}, { id: 1, user_id: 1, status: 1 });
```

---

### 3. Belirli alanları seç (user_id, status) — id olmadan

```sql
SELECT user_id, status FROM people
```

```js
db.people.find({}, { user_id: 1, status: 1, _id: 0 });
```

---

### 4. Koşullu sorgulama — WHERE status = "A"

```sql
SELECT * FROM people WHERE status = "A"
```

```js
db.people.find({ status: "A" });
```

---

### 5. Koşullu + alan seçimi

```sql
SELECT user_id, status FROM people WHERE status = "A"
```

```js
db.people.find({ status: "A" }, { user_id: 1, status: 1, _id: 0 });
```

---

### 6. Eşit değil — status != "A"

```sql
SELECT * FROM people WHERE status != "A"
```

```js
db.people.find({ status: { $ne: "A" } });
```

---

### 7. AND koşulu

```sql
SELECT * FROM people WHERE status = "A" AND age = 50
```

```js
db.people.find({ status: "A", age: 50 });
// veya açık haliyle:
db.people.find({ $and: [{ status: "A" }, { age: 50 }] });
```

---

### 8. OR koşulu

```sql
SELECT * FROM people WHERE status = "A" OR age = 50
```

```js
db.people.find({ $or: [{ status: "A" }, { age: 50 }] });
```

---

### 9. Büyüktür — age > 25

```sql
SELECT * FROM people WHERE age > 25
```

```js
db.people.find({ age: { $gt: 25 } });
```

---

### 10. Küçüktür — age < 25

```sql
SELECT * FROM people WHERE age < 25
```

```js
db.people.find({ age: { $lt: 25 } });
```

---

### 11. Aralık — age > 25 AND age <= 50

```sql
SELECT * FROM people WHERE age > 25 AND age <= 50
```

```js
db.people.find({ age: { $gt: 25, $lte: 50 } });
```

---

### 12. LIKE — user_id içinde "bc" geçenler

```sql
SELECT * FROM people WHERE user_id like "%bc%"
```

```js
db.people.find({ user_id: /bc/ });
// veya:
db.people.find({ user_id: { $regex: "bc" } });
```

---

### 13. Sıralama — ASC

```sql
SELECT * FROM people WHERE status = "A" ORDER BY user_id ASC
```

```js
db.people.find({ status: "A" }).sort({ user_id: 1 });
```

---

### 14. Sıralama — DESC

```sql
SELECT * FROM people WHERE status = "A" ORDER BY user_id DESC
```

```js
db.people.find({ status: "A" }).sort({ user_id: -1 });
```

---

### 15. Toplam kayıt sayısı

```sql
SELECT COUNT(*) FROM people
```

```js
db.people.countDocuments({});
```

---

### 16. Belirli alan sayısı (null olmayanlar)

```sql
SELECT COUNT(user_id) FROM people
```

```js
db.people.countDocuments({ user_id: { $exists: true, $ne: null } });
```

---

### 17. Koşullu sayım

```sql
SELECT COUNT(*) FROM people WHERE age > 30
```

```js
db.people.countDocuments({ age: { $gt: 30 } });
```

---

### 18. DISTINCT — tekrarsız değerler

```sql
SELECT DISTINCT(status) FROM people
```

```js
db.people.distinct("status");
```

---

### 19. Limit — ilk 1 kayıt

```sql
SELECT * FROM people LIMIT 1
```

```js
db.people.findOne({});
// veya:
db.people.find({}).limit(1);
```

---

### 20. Limit + Skip (Sayfalama)

```sql
SELECT * FROM people LIMIT 5 SKIP 10
```

```js
db.people.find({}).limit(5).skip(10);
```

---

### 21. Tablo/Koleksiyon oluşturma

```sql
CREATE TABLE people (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  user_id Varchar(30),
  age Number,
  status char(1),
  PRIMARY KEY (id)
)
```

```js
// MongoDB'de koleksiyon otomatik oluşur; şema için Mongoose kullanılır:
const peopleSchema = new mongoose.Schema({
  user_id: String,
  age: Number,
  status: String,
});
const People = mongoose.model("People", peopleSchema);
```

---

### 22. Yeni alan ekleme (ALTER TABLE)

```sql
ALTER TABLE people ADD join_date DATETIME
```

```js
// MongoDB şemasız olduğundan doğrudan güncelleme yapılır:
db.people.updateMany({}, { $set: { join_date: null } });
```

---

### 23. Koleksiyon/Tablo silme

```sql
DROP TABLE people
```

```js
db.people.drop();
```

---

### 24. Kayıt ekleme (INSERT)

```sql
INSERT INTO people(user_id, age, status) VALUES ("bcd001", 45, "A")
```

```js
db.people.insertOne({ user_id: "bcd001", age: 45, status: "A" });
```

---

### 25. Koşullu güncelleme

```sql
UPDATE people SET status = "C" WHERE age > 25
```

```js
db.people.updateMany({ age: { $gt: 25 } }, { $set: { status: "C" } });
```

---

### 26. Sayısal artırma

```sql
UPDATE people SET age = age + 3 WHERE status = "A"
```

```js
db.people.updateMany({ status: "A" }, { $inc: { age: 3 } });
```

---

### 27. Koşullu silme

```sql
DELETE FROM people WHERE status = "D"
```

```js
db.people.deleteMany({ status: "D" });
```

---

### 28. Tüm kayıtları sil

```sql
DELETE FROM people
```

```js
db.people.deleteMany({});
```

---

##  MongoDB Operatör Özet Tablosu

| SQL Operatörü                | MongoDB Karşılığı                |
| ---------------------------- | -------------------------------- |
| `=`                          | `{ alan: deger }`                |
| `!=`                         | `$ne`                            |
| `>`                          | `$gt`                            |
| `>=`                         | `$gte`                           |
| `<`                          | `$lt`                            |
| `<=`                         | `$lte`                           |
| `AND`                        | `$and` veya virgülle yazım       |
| `OR`                         | `$or`                            |
| `LIKE "%x%"`                 | `$regex` veya `/x/`              |
| `ORDER BY ASC`               | `.sort({ alan: 1 })`             |
| `ORDER BY DESC`              | `.sort({ alan: -1 })`            |
| `LIMIT`                      | `.limit(n)`                      |
| `SKIP`                       | `.skip(n)`                       |
| `COUNT(*)`                   | `.countDocuments({})`            |
| `DISTINCT`                   | `.distinct("alan")`              |
| `INSERT`                     | `.insertOne()` / `.insertMany()` |
| `UPDATE SET`                 | `$set`                           |
| `UPDATE SET alan = alan + n` | `$inc`                           |
| `DELETE`                     | `.deleteOne()` / `.deleteMany()` |
