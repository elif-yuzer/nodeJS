# Blog API

Node.js, Express ve MongoDB ile yazılmış RESTful blog API'si.

---

## Kurulum

```bash
git clone <repo-url>
cd <proje-klasörü>
npm install
```

`.env` dosyası oluştur:

```env
PORT=3500
MONGODB_URI=mongodb://127.0.0.1:27017/blog_app
```

Sunucuyu başlat:

```bash
npm start
```

---

## Proje Yapısı

```
├── app.js                  # Giriş noktası
├── db/
│   └── connection.js       # MongoDB bağlantısı
├── models/
│   └── blogModel.js        # Mongoose şemaları
├── controllers/
│   └── blogController.js   # İş mantığı
└── routes/
    └── blogRouter.js       # Endpoint tanımları
```

---

## Katmanlar

### app.js — Giriş noktası
- `dotenv.config()` **en üste** yazılır, aksi hâlde `process.env` değerleri boş gelir
- `express.json()` middleware'i JSON body parse için eklenir
- DB bağlantısı kurulduktan sonra sunucu dinlemeye başlar

### db/connection.js — Veritabanı bağlantısı
- `mongoose.connect()` sonucu `return` edilir — edilmezse promise kaybolur, uygulama DB hazır olmadan çalışmaya devam eder
- `.catch` bloğundaki `err` nesnesi Mongoose tarafından fırlatılır, JavaScript tarafından yakalanır

### models/blogModel.js — Veri şeması
- `mongoose.Schema` ile alan tipleri ve kısıtlar tanımlanır
- `mongoose.model('İsim', schema)` ile koleksiyon adı belirlenir

### controllers/blogController.js — İş mantığı
- Her handler `async/await` kullanır
- `try/catch` ile hatalar yakalanır ve 500 döndürülür
- `findById(req.params.id)` — id doğrudan geçilir, objeye sarılmaz

### routes/blogRouter.js — Endpoint tanımları
- `/:id` ve `/:name` **aynı URL pattern**'idir; Express her zaman üsttekini çalıştırır
- Çakışmayı önlemek için farklı prefix kullanılır

---

## Endpoint'ler

| Method | URL | Açıklama |
|--------|-----|----------|
| `GET` | `/blogs/categories` | Tüm kategorileri listele |
| `POST` | `/blogs/categories` | Yeni kategori oluştur |
| `GET` | `/blogs/categories/id/:id` | ID ile kategori getir |
| `GET` | `/blogs/categories/name/:name` | İsim ile kategori getir |

---

## Sık Yapılan Hatalar

| Hata | Neden | Çözüm |
|------|-------|-------|
| `data: null` dönüyor | `findById({ id: ... })` yanlış kullanım | `findById(req.params.id)` kullan |
| Route hiç çalışmıyor | `/:id` ve `/:name` aynı pattern, üstteki kazanır | `/id/:id` ve `/name/:name` yap |
| `process.env` boş | `dotenv.config()` geç çağrılmış | `app.js`'in en üstüne taşı |
| DB bağlantısı beklenmiyor | `return` eksik | `return mongoose.connect(...)` yaz |

---

## Örnek İstekler

Kategori oluştur:
```http
POST /blogs/categories
Content-Type: application/json

{ "name": "Teknoloji" }
```

ID ile getir:
```http
GET /blogs/categories/id/664f1a2b3c4d5e6f7a8b9c0d
```

İsim ile getir:
```http
GET /blogs/categories/name/Teknoloji
```

---

## Bağımlılıklar

| Paket | Amaç |
|-------|------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `dotenv` | Ortam değişkenleri |