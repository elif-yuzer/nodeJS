# 🚗 RentACar API

Node.js / Express tabanlı araç kiralama REST API'si. JWT kimlik doğrulama, rol tabanlı yetkilendirme (RBAC) ve pagination/filter/search desteği içerir.

---

## 📁 Proje Yapısı

```
src/
├── config/
│   └── dbConnection.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── helpers/
│   ├── customError.js
│   ├── passwordCompare.js
│   └── tokenHelper.js
├── middlewares/
│   ├── authentication.js   ← verifyJWT + authorize
│   ├── errorHandler.js
│   ├── permissions.js      ← RBAC permission tablosu
│   └── queryHandler.js     ← filter/search/sort/pagination
├── models/
│   ├── carModel.js
│   └── userModel.js
└── routes/
    ├── authRoute.js
    ├── index.js
    └── userRoute.js
```

---

## ⚙️ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env

# Sunucuyu başlat
npm start
```

### .env Değişkenleri

```env
PORT=3500
DB_URI=mongodb://127.0.0.1:27017/rentAcar

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRE=10m

REFRESH_TOKEN_SECRET=your_refresh_secret

BCRYPT_SALT_ROUNDS=10
```

---

## 👥 Roller ve Yetkiler

Sistemde 3 kullanıcı tipi vardır:

| Alan | Değer | Rol |
|------|-------|-----|
| isAdmin: true | - | Admin — her şeyi yapabilir |
| isAdmin: false, isStaff: true | - | Staff — araç/rezervasyon yönetir |
| isAdmin: false, isStaff: false | isActive: true | Müşteri — booking yapabilir |

### Permission Tablosu

```javascript
const PERMISSIONS = {
  // Kullanıcı
  "user:readSelf":    { isActive: true },   // herkes kendi profilini görebilir
  "user:readOther":   { isAdmin: true },    // sadece admin başkasını görebilir
  "user:readAll":     { isAdmin: true },    // sadece admin tüm listeyi görebilir
  "user:updateSelf":  { isActive: true },   // herkes kendini güncelleyebilir
  "user:delete":      { isAdmin: true },    // sadece admin silebilir

  // Araç
  "car:read":         { isActive: true },   // herkes görebilir
  "car:create":       { isStaff: true },    // staff/admin ekleyebilir
  "car:update":       { isStaff: true },    // staff/admin güncelleyebilir
  "car:delete":       { isAdmin: true },    // sadece admin silebilir

  // Kiralama
  "rental:create":    { isActive: true },   // müşteri kiralayabilir
  "rental:readOwn":   { isActive: true },   // kendi kiralamasını görebilir
  "rental:readAll":   { isStaff: true },    // staff tüm kiralamaları görür
  "rental:approve":   { isStaff: true },    // staff onaylayabilir
  "rental:delete":    { isAdmin: true },    // sadece admin silebilir
};
```

---

## 🔐 Middleware Katmanları

İstek akışı şu şekildedir:

```
İstek gelir
    │
    ▼
verifyJWT        → "Bu kişi kim?" (token decode → req.user)
    │
    ▼
authorize(perm)  → "Bu işlemi yapabilir mi?" (PERMISSIONS tablosu)
    │
    ▼
queryHandler     → Filter/search/sort/pagination (opsiyonel)
    │
    ▼
Controller       → DB işlemi + Response
```

### verifyJWT

Token'ı doğrular ve `req.user`'a kullanıcı bilgilerini ekler:

```javascript
req.user = {
  _id:     decoded._id,
  isAdmin: decoded.isAdmin,
  isStaff: decoded.isStaff,
  isActive: decoded.isActive,
}
```

### authorize(permission)

Higher-order function — permission tablosuna göre erişimi kontrol eder. Admin her zaman bypass eder:

```javascript
router.get("/", verifyJWT, authorize("user:readAll"), list);
```

### queryHandler

URL parametrelerinden filter/search/sort/pagination okur ve `res.getModelList` / `res.getModelListDetails` fonksiyonlarını `res`'e ekler:

```javascript
const result = await res.getModelList(User, customFilter);
const details = await res.getModelListDetails(User, customFilter);
```

---

## 🛣️ API Endpoints

### Auth — `/auth`

| Method | URL | Açıklama | Yetki |
|--------|-----|----------|-------|
| POST | `/auth/register` | Kayıt ol | Herkese açık |
| POST | `/auth/login` | Giriş yap | Herkese açık |
| GET | `/auth/logout` | Çıkış yap | Token gerekli |
| POST | `/auth/refresh` | Token yenile | Refresh token gerekli |

### Users — `/users`

| Method | URL | Açıklama | Yetki |
|--------|-----|----------|-------|
| GET | `/users` | Tüm kullanıcıları listele | Admin |
| GET | `/users/profile` | Kendi profilini gör | Aktif kullanıcı |
| GET | `/users/:id` | Başka birinin profilini gör | Admin |
| PUT | `/users/:id` | Kullanıcı güncelle | Aktif kullanıcı / Admin |
| DELETE | `/users/:id` | Kullanıcı sil | Admin |

### Cars — `/cars`

| Method | URL | Açıklama | Yetki |
|--------|-----|----------|-------|
| GET | `/cars` | Araçları listele | Aktif kullanıcı |
| GET | `/cars/:id` | Araç detayı | Aktif kullanıcı |
| POST | `/cars` | Araç ekle | Staff / Admin |
| PUT | `/cars/:id` | Araç güncelle | Staff / Admin |
| DELETE | `/cars/:id` | Araç sil | Admin |

### Rentals — `/rentals`

| Method | URL | Açıklama | Yetki |
|--------|-----|----------|-------|
| POST | `/rentals` | Kiralama oluştur | Aktif kullanıcı |
| GET | `/rentals/my` | Kendi kiralamalarım | Aktif kullanıcı |
| GET | `/rentals` | Tüm kiralamalar | Staff / Admin |
| PUT | `/rentals/:id/approve` | Kiralama onayla | Staff / Admin |
| DELETE | `/rentals/:id` | Kiralama sil | Admin |

---

## 🔍 Query Parametreleri

Listeleme endpoint'lerinde şu parametreler kullanılabilir:

```
# Filter (tam eşleşme)
GET /cars?filter[isPublish]=true&filter[transmission]=automatic

# Search (regex, büyük/küçük harf duyarsız)
GET /cars?search[brand]=BMW&search[model]=series

# Sort (1: artan, -1: azalan)
GET /cars?sort[pricePerDay]=-1&sort[brand]=1

# Pagination
GET /cars?page=2&limit=5

# Hepsi birlikte
GET /cars?filter[isPublish]=true&search[brand]=BMW&sort[pricePerDay]=-1&page=1&limit=10
```

---

## 🧪 REST Client Test Örnekleri

```http
@baseUrl = http://127.0.0.1:3500
@accessToken = YOUR_TOKEN_HERE

### Register
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@mail.com",
  "password": "Test1234!",
  "isAdmin": false
}

###

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "Test1234!"
}

###

### Kendi profilini gör
GET {{baseUrl}}/users/profile
Authorization: Bearer {{accessToken}}

###

### Tüm kullanıcıları listele (Admin)
GET {{baseUrl}}/users
Authorization: Bearer {{accessToken}}

###

### Kullanıcı güncelle
PUT {{baseUrl}}/users/USER_ID_HERE
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
  "username": "yenikullaniciadi"
}

###

### Araçları listele — filter + sort
GET {{baseUrl}}/cars?filter[isPublish]=true&sort[pricePerDay]=-1
Authorization: Bearer {{accessToken}}

###

### Araçları listele — pagination
GET {{baseUrl}}/cars?page=2&limit=5
Authorization: Bearer {{accessToken}}
```

---

## ⚠️ Güvenlik Notları

- Normal kullanıcı `update` endpoint'inde `isAdmin`, `isStaff`, `isActive` alanlarını değiştiremez — controller tarafında silinir.
- Admin tüm kullanıcıları güncelleyebilir (`req.params.id`), normal kullanıcı sadece kendini (`req.user._id`).
- Token süresi dolduğunda `401 Access token expired` hatası alınır — `/auth/refresh` ile yenilenmelidir.
- `isActive: false` olan kullanıcılar `user:readSelf` gerektiren endpoint'lere erişemez.

---

## 🛠️ Kullanılan Teknolojiler

- Node.js / Express
- MongoDB / Mongoose
- JSON Web Token (JWT)
- bcrypt
- mongoose-unique-validator
- dotenv

YAPILACAKLAR :
car controllerin update delete e bak
reservasyon mantıgını olusturdum