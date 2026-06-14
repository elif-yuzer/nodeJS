src/
├── constants/
│ ├── roles.js ← ROLES sabiti
│ ├── permissions.js ← PERMISSIONS tablosu
│ └── index.js ← tek export noktası
├── config/
│ └── dbConnection.js
├── models/
│ ├── userModel.js
│ ├── organizerRequestModel.js
│ ├── eventModel.js
│ ├── activityModel.js
│ ├── forumModel.js
│ ├── commentModel.js
│ ├── eventCategoryModel.js
│ └── institutionModel.js
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── organizerRequestController.js
│ ├── eventController.js
│ ├── activityController.js
│ ├── forumController.js
│ └── commentController.js
├── middlewares/
│ ├── authentication.js ← verifyJWT + authorize
│ ├── queryHandler.js ← filter/search/sort/pagination
│ └── errorHandler.js
├── helpers/
│ ├── customError.js
│ └── tokenHelper.js
└── routes/
├── index.js
├── authRoute.js
├── userRoute.js
├── organizerRequestRoute.js
├── eventRoute.js
├── activityRoute.js
├── forumRoute.js
└── commentRoute.js

    ********

    # 🔐 Auth & Admin — İsterler, Flow ve Endpoints

---

## 👥 Roller

```javascript
const ROLES = Object.freeze({
  PARENT: "parent", // default — kayıt olan herkes
  ORGANIZER: "organizer", // admin onaylı etkinlik organizatörü
  ADMIN: "admin", // sistem yöneticisi (3 kişi, eşit yetki)
});
```

---

## 🛡️ Permission Tablosu

```javascript
const PERMISSIONS = {
  // ── AUTH ──────────────────────────────────────────────────────
  "auth:refresh": { isActive: true }, // token yenile
  "auth:logout": { isActive: true }, // çıkış yap

  // ── USER ──────────────────────────────────────────────────────
  "user:readSelf": { isActive: true }, // kendi profilini gör
  "user:updateSelf": { isActive: true }, // kendi profilini güncelle
  "user:readAll": { isAdmin: true }, // tüm kullanıcıları listele
  "user:readOther": { isAdmin: true }, // başkasının profilini gör
  "user:delete": { isAdmin: true }, // kullanıcı sil
  "user:ban": { isAdmin: true }, // kullanıcı banla (isActive: false)
  "user:setRole": { isAdmin: true }, // rol değiştir

  // ── ORGANIZER REQUEST ─────────────────────────────────────────
  "organizerRequest:create": { isActive: true }, // başvuru oluştur
  "organizerRequest:readOwn": { isActive: true }, // kendi başvurularını gör
  "organizerRequest:readAll": { isAdmin: true }, // tüm başvuruları listele
  "organizerRequest:approve": { isAdmin: true }, // onayla
  "organizerRequest:reject": { isAdmin: true }, // reddet

  // ── EMAIL ─────────────────────────────────────────────────────
  "auth:verifyEmail": { isActive: true }, // email doğrula
  "auth:resendVerification": { isActive: true }, // doğrulama maili tekrar gönder
};
```

---

## 📋 İsterler — Madde Madde

### AUTH

**Register:**

- Kullanıcı `username`, `firstName`, `lastName`, `email`, `password`, `location` ile kayıt olur
- `role` default olarak `"parent"` atanır
- `isActive: true`, `isEmailVerified: false` set edilir
- Kayıt başarılı → email doğrulama maili gönderilir (`emailVerificationToken` üretilir)
- Token DB'ye kaydedilir (`emailVerificationToken`, `emailVerificationExpire`)
- `isAdmin` body'den gönderilse bile **görmezden gelinir** — güvenlik

**Email Doğrulama:**

- Kullanıcı maildeki linke tıklar → `GET /auth/verify-email?token=xxx`
- Token DB'deki ile eşleşirse → `isEmailVerified: true`, token silinir
- Token süresi dolmuşsa → hata fırlatılır, yeniden gönderme endpoint'i kullanılır

**Login:**

- `username` veya `email` + `password` ile giriş
- Şifre bcrypt ile karşılaştırılır (`matchPassword` model metodu)
- `isActive: false` ise → hata: hesap banlanmış
- Başarılıysa:
  - `accessToken` üretilir (15dk) → response body
  - `refreshToken` üretilir (1 gün) → DB'ye kaydedilir + httpOnly cookie
  - `lastLoginAt` güncellenir

**Logout:**

- `refreshToken` DB'den silinir (`user.refreshToken = null`)
- Cookie temizlenir
- Token artık geçersiz → gerçek logout

**Token Yenileme (Refresh):**

- Cookie'den veya body'den `refreshToken` alınır
- DB'de bu token var mı kontrol edilir
- Kullanıcı hala `isActive` mi kontrol edilir
- Yeni `accessToken` üretilir → response body

**Şifre Sıfırlama:**

- `POST /auth/forgot-password` → email gönderilir, `resetPasswordToken` + `resetPasswordExpire` DB'ye kaydedilir
- `PATCH /auth/reset-password?token=xxx` → yeni şifre set edilir, token silinir, tüm refresh token'lar silinir (tüm cihazlardan çıkış)

---

### ORGANIZER REQUEST

**Başvuru Oluşturma:**

- Sadece `role: "parent"` olan kullanıcı başvurabilir
- Aynı bilgilerle `status: "pending"` bekleyen talep varsa → 409 hata
- Farklı bilgilerle yeni talep oluşturulabilir
- Başvuruyla birlikte kurum bilgileri de gönderilir (`institutionData`)
- Başvuru oluşturulunca admin'lere bildirim gönderilir (opsiyonel)

**Admin Onaylama:**

- `user.role = "organizer"` yapılır
- `user.refreshToken = null` → kullanıcı yeniden login yapmak zorunda
- `Institution` kaydı oluşturulur
- `user.institutionId` set edilir
- `request.status = "approved"`, `request.reviewedBy`, `request.reviewedAt` kaydedilir

**Admin Reddetme:**

- `request.status = "rejected"`
- `request.rejectedReason` kaydedilir
- `request.reviewedBy`, `request.reviewedAt` kaydedilir
- Kullanıcı tekrar başvurabilir (farklı/düzeltilmiş bilgilerle)

---

### USER (Admin Panel)

**Kullanıcı Yönetimi:**

- Admin tüm kullanıcıları listeleyebilir (filter/search/sort/pagination)
- Admin herhangi bir kullanıcıyı görebilir
- Admin kullanıcıyı `isActive: false` yaparak banlayabilir (soft delete)
- Admin kullanıcı rolünü değiştirebilir (`user:setRole`)
- Kullanıcı silinirse `refreshToken` da silinir

---

## 🚦 Flow Akışı

### Kayıt & Email Doğrulama Akışı

```
POST /auth/register
    ↓
Validation (şifre regex, email format, zorunlu alanlar)
    ↓
Email benzersiz mi? Username benzersiz mi? → 409 hata
    ↓
User.create({ ...body, role: "parent", isEmailVerified: false })
    ↓
emailVerificationToken üret → DB'ye kaydet
    ↓
Mail gönder (Nodemailer/Resend)
    ↓
201 response → "Kayıt başarılı, emailinizi doğrulayın"
    ↓
GET /auth/verify-email?token=xxx
    ↓
Token DB'de var mı + süresi geçmemiş mi?
    ↓
isEmailVerified: true → token sil
    ↓
200 response → "Email doğrulandı"
```

---

### Login & Token Akışı

```
POST /auth/login
    ↓
username/email + password kontrolü
    ↓
User DB'de var mı?
    ↓
isActive: false? → 401 hata
    ↓
bcrypt karşılaştır → yanlışsa 401
    ↓
accessToken üret (15dk) → body
refreshToken üret (1gün) → DB + httpOnly cookie
lastLoginAt güncelle
    ↓
200 response
```

---

### Token Yenileme Akışı

```
POST /auth/refresh
    ↓
Cookie veya body'den refreshToken al
    ↓
Token yok → 401
    ↓
DB'de bu token var mı? → yok → 401 (geçersiz/çalınmış token)
    ↓
jwt.verify → süresi dolmuş → 401
    ↓
User.findById → isActive: false → 401
    ↓
Yeni accessToken üret → body
    ↓
200 response
```

---

### Organizer Başvuru Akışı

```
POST /organizer-requests
    ↓
verifyJWT → authorize("organizerRequest:create")
    ↓
req.user.role === "organizer" veya "admin" → 403 (zaten organizatör)
    ↓
Aynı bilgilerle pending talep var mı? → 409
    ↓
OrganizerRequest.create({ userId, message, institutionData, status: "pending" })
    ↓
201 response
    ↓
        ── Admin Panelde ──
GET /admin/organizer-requests?status=pending
    ↓
Admin inceler
    ↓
PUT /admin/organizer-requests/:id/approve
    ↓
user.role = "organizer"
user.refreshToken = null
Institution.create(institutionData)
user.institutionId = institution._id
request.status = "approved"
request.reviewedBy = admin._id
request.reviewedAt = now
    ↓
200 response
    ↓
Kullanıcı artık login olunca role: "organizer" token alır
```

---

### Şifre Sıfırlama Akışı

```
POST /auth/forgot-password
    ↓
Email DB'de var mı?
    ↓
resetPasswordToken üret (crypto.randomBytes)
resetPasswordExpire = now + 10dk
DB'ye kaydet
    ↓
Mail gönder: "Şifrenizi sıfırlamak için tıklayın: /reset-password?token=xxx"
    ↓
200 response → "Mail gönderildi"
    ↓
PATCH /auth/reset-password?token=xxx
    ↓
Token DB'de var mı + süresi geçmemiş mi?
    ↓
user.password = yeniŞifre (pre-save hook hashler)
user.resetPasswordToken = null
user.resetPasswordExpire = null
user.refreshToken = null  ← tüm cihazlardan çıkış
    ↓
200 response → "Şifre sıfırlandı, yeniden giriş yapın"
```

---

## 🛣️ Endpoints

### Auth Routes — `/auth`

| Method | Endpoint                    | Açıklama                         | Permission                |
| ------ | --------------------------- | -------------------------------- | ------------------------- |
| POST   | `/auth/register`            | Kayıt ol                         | Herkese açık              |
| GET    | `/auth/verify-email`        | Email doğrula (`?token=xxx`)     | Herkese açık              |
| POST   | `/auth/resend-verification` | Doğrulama maili tekrar gönder    | `auth:resendVerification` |
| POST   | `/auth/login`               | Giriş yap                        | Herkese açık              |
| GET    | `/auth/logout`              | Çıkış yap                        | `auth:logout`             |
| POST   | `/auth/refresh`             | Token yenile                     | Herkese açık (token ile)  |
| POST   | `/auth/forgot-password`     | Şifre sıfırlama maili            | Herkese açık              |
| PATCH  | `/auth/reset-password`      | Yeni şifre set et (`?token=xxx`) | Herkese açık              |

---

### User Routes — `/users`

| Method | Endpoint                 | Açıklama                 | Permission        |
| ------ | ------------------------ | ------------------------ | ----------------- |
| GET    | `/users/profile`         | Kendi profilini gör      | `user:readSelf`   |
| PUT    | `/users/profile`         | Kendi profilini güncelle | `user:updateSelf` |
| PUT    | `/users/change-password` | Şifre değiştir           | `user:updateSelf` |

---

### Admin Routes — `/admin`

| Method | Endpoint                                | Açıklama                  | Permission                 |
| ------ | --------------------------------------- | ------------------------- | -------------------------- |
| GET    | `/admin/users`                          | Tüm kullanıcıları listele | `user:readAll`             |
| GET    | `/admin/users/:id`                      | Kullanıcı detayı          | `user:readOther`           |
| PUT    | `/admin/users/:id/ban`                  | Kullanıcıyı banla         | `user:ban`                 |
| PUT    | `/admin/users/:id/unban`                | Ban kaldır                | `user:ban`                 |
| PUT    | `/admin/users/:id/role`                 | Rol değiştir              | `user:setRole`             |
| DELETE | `/admin/users/:id`                      | Kullanıcı sil             | `user:delete`              |
| GET    | `/admin/organizer-requests`             | Tüm başvurular            | `organizerRequest:readAll` |
| GET    | `/admin/organizer-requests/:id`         | Başvuru detayı            | `organizerRequest:readAll` |
| PUT    | `/admin/organizer-requests/:id/approve` | Onayla                    | `organizerRequest:approve` |
| PUT    | `/admin/organizer-requests/:id/reject`  | Reddet                    | `organizerRequest:reject`  |

---

### Organizer Request Routes — `/organizer-requests`

| Method | Endpoint                 | Açıklama           | Permission                 |
| ------ | ------------------------ | ------------------ | -------------------------- |
| POST   | `/organizer-requests`    | Başvuru oluştur    | `organizerRequest:create`  |
| GET    | `/organizer-requests/my` | Kendi başvurularım | `organizerRequest:readOwn` |

---

## 🗄️ User Modeline Eklenecek Alanlar

```javascript
// Mevcut alanlara ek olarak:

refreshToken: {
  type: String,
  default: null,
  select: false,
},

emailVerificationToken: {
  type: String,
  default: null,
  select: false,
},

emailVerificationExpire: {
  type: Date,
  default: null,
},

resetPasswordToken: {
  type: String,
  default: null,
  select: false,
},

resetPasswordExpire: {
  type: Date,
  default: null,
},

institutionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Institution",
  default: null,
},

lastLoginAt: {
  type: Date,
  default: null,
},

// loginAttempts zaten DB diyagramında var
loginAttempts: {
  type: Number,
  default: 0,
},
```

---

## ⚠️ Kritik Güvenlik Kararları

| Konu                  | Karar                                     | Neden                                 |
| --------------------- | ----------------------------------------- | ------------------------------------- |
| `refreshToken`        | DB'de saklanır                            | Gerçek logout, token çalınma koruması |
| `isAdmin` register'da | Body'den görmezden gelinir                | Güvenlik açığı önleme                 |
| Rol değişimi          | Sadece admin yapabilir                    | Kullanıcı kendi rolünü değiştiremez   |
| Organizer onayı       | `refreshToken` sıfırlanır                 | Yeni rolle yeniden login zorunda      |
| Şifre reset           | Tüm `refreshToken` silinir                | Tüm cihazlardan çıkış                 |
| Email doğrulanmamış   | Login olabilir ama bazı işlemler kısıtlı  | UX dengesi                            |
| Token süresi          | `accessToken: 15dk`, `refreshToken: 1gün` | Güvenlik/kullanılabilirlik dengesi    |
