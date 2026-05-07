# Recipe App — Server (Backend)

Bu README, backend (`server/`) tarafını belgeler: nasıl çalıştırılır, giriş noktası, kurulu paketler ve temel modüller.

---

## 🚀 Hızlı Başlangıç

1. Bağımlılıkları yükle:
   ```bash
   npm install
   ```
2. `server/` klasörüne `.env` dosyası oluştur (örnek aşağıda).
3. Geliştirme sunucusunu başlat:
   ```bash
   npm run dev
   ```

---

## 📁 Giriş Noktası & Scriptler

- **Geliştirme giriş noktası:** `src/app.ts`

| Script | Komut |
|--------|-------|
| `dev` | `ts-node-dev --respawn --transpile-only src/app.ts` |
| `build` | `tsc` |
| `start` | `node dist/index.js` |

---

## 🔐 Ortam Değişkenleri (`.env` Örneği)

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://user:pass@host:27017/dbname
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=<node crypto ile üretilen 1. key>
REFRESH_TOKEN_SECRET=<node crypto ile üretilen 2. key>
```

> **Not:** Secret key'leri Node.js CLI ile üretebilirsin:
> ```bash
> node
> require('crypto').randomBytes(64).toString('hex')
> ```
> İki farklı key üret: biri `ACCESS_TOKEN_SECRET`, diğeri `REFRESH_TOKEN_SECRET` için.

---

## 🗂️ Proje Yapısı & Dosya Açıklamaları

### `src/app.ts` — Ana Uygulama & Server

Proje yapılırken ilk olarak klasör ve dosya konfigürasyonu yapıldı, ardından `.env` dosyasına database ve port bilgileri tanımlandı.

App dosyası, aslında bir server yaratmak demektir. Bu server arka planda kocaman bir callback fonksiyonuyla request'leri (istekleri) alan, aynı anda 100 kullanıcı varsa 100 tane request alan bir yapıya sahip.

**Import sırası şöyle kuruldu:**
1. `dotenv` ve `dotenv.config` import edilir
2. Express framework dahil edilir
3. Database connection bilgileri import edilir

Önceden `http.createServer` diye upuzun bir fonksiyon açılıp bütün işlemler manuel olarak, pure Node.js'te yapılıyordu. Ama Express bunu `app` adı altında sağlıyor. `app`, Express'in bir metodu — aslında pure Node.js'te yazılan o application kısmı.

**Middleware Yapısı:**
Gelen request buffer şeklinde, baytlar halinde geliyor. `app.use(express.json())` ile o arkadaki parser (body-parser) uzun işi kısaltarak, JSON formatında string şeklinde request alınıyor.

Middleware'ler ara katmanlardır; Router'lar ve Controller'lar arasında işlem yapan güvenlik elemanı gibi çalışır. `/api/users` adında bir URL oluşturuldu ve `app.use` ile router bileşenine yönlendirme yapıldı.

---

### `src/config/db.ts` — Veritabanı Bağlantısı

Mongoose kullanıldığı için Mongoose import edildi. `dotenv.config` sayesinde `process.env` ile URI okunabiliyor ve uygulamada çağırılabiliyor. URI bir değişkene atandı.

`connectDB` adında asenkron bir fonksiyon yazıldı. Veritabanı işlemi olduğu için `async/await` yapısı kullanıldı, olası hatalara karşı da `try-catch` eklendi:

- `if` koşuluyla URI'ın varlığı kontrol edilir → yoksa hata fırlatılır
- Mongoose URI'a bağlanana kadar beklenir
- Bağlantı başarılıysa `"is connected"` logu atılır
- Hata olursa `catch` ile yakalanır ve `process.exit(1)` ile süreç sonlandırılır
- 

---

### `src/middlewares/errorHandler.ts` — Hata Yönetimi

Merkezi hata yöneticisidir. JSON formatında hata döner, `NODE_ENV=development` olmadıkça stack trace'i gizler.

---

### `src/middlewares/verifyJWT.ts` — JWT Doğrulama Middleware'i

`verifyJWT` adında bir fonksiyon oluşturuldu; `request`, `response`, `next` alıyor — her middleware gibi.

**Akış:**
1. `req.headers['authorization']`'dan `authHeader` alınır
2. Header yoksa → `401 Unauthorized` döner
3. Header şu formattadır: `Bearer eyJhbGciOiJIUzI1NiJ9...`
4. `split(' ')` ile boşluktan ikiye bölünür → Token `[1]` pozisyonundadır
5. `jwt.verify()` ile token doğrulanır (`ACCESS_TOKEN_SECRET` kullanılır)
6. Hata varsa → `403 Forbidden` (token var ama bozuk/süresi dolmuş)
7. Hata yoksa → `decoded`'dan bilgiler alınıp `request.user`'a atılır, `next()` çağırılır

> **Statü Kodları:**
> - `401 Unauthorized` → Token hiç gönderilmemiş
> - `403 Forbidden` → Token var ama geçersiz/süresi dolmuş

---

### `src/services/authService.ts` — Auth Servisi

**Kayıt (Register):** Mevcut email kontrol edilir → şifre `bcrypt` ile hashlenir → `User` oluşturulur.

**Giriş (Login):** `User.findOne({ email })` ile veritabanından kullanıcının tüm kaydı getirilir (SQL karşılığı: `SELECT * FROM users WHERE email = '...' LIMIT 1`). Doğrulama başarılıysa `{ foundedUser, accessToken, refreshToken }` döner.

---

### `src/controllers/recipeController.ts` — Recipe Controller

Örnek controller: `getAllRecipe` tüm tarifleri döner.

---

### `src/controllers/userController.ts` — User Controller

Şu an boş; kullanıcı ile ilgili endpoint'leri barındırması bekleniyor.

---

## 🗃️ Mongoose Modelleri (`src/models/`)

| Model | Dosya | Alanlar |
|-------|-------|---------|
| User | `users.ts` | name, email (unique), password, image, role |
| Recipe | `recipe.ts` | title, preparation, media, publish, userId, categoryId, likes |
| Category | `categories.ts` | name |

---

## 📦 Kurulu Paketler

### Runtime

| Paket | Amaç |
|-------|------|
| `express` | Route ve middleware için web framework |
| `mongoose` | Model ve DB erişimi için MongoDB ODM |
| `dotenv` | `.env` dosyasını `process.env`'e yükler |
| `cors` | CORS middleware |
| `bcrypt` | Auth için şifre hashleme |
| `jsonwebtoken` | JWT token üretmek ve doğrulamak için |
| `cookie-parser` | `req.cookies` ile çerez okumak için |

### Dev

| Paket | Amaç |
|-------|------|
| `typescript` | TypeScript desteği |
| `ts-node-dev` | Hot reload ile geliştirme |
| `@types/*` | TypeScript tip tanımları |
| `@types/jsonwebtoken` | `jsonwebtoken` için tip tanımları |

---

## 🔑 JWT (JSON Web Token) Sistemi

### Genel Mantık

JWT, lüks bir restorandaki VIP Bileklik sistemidir:

1. **Giriş (Authentication):** Müşteri kimliğini ve şifresini gösterir, doğrulanır.
2. **Bileklik Takılması (Token Üretimi):** `jwt.sign` ile kullanıcının `id` ve `role` bilgileri gizli damgayla (secret) mühürlenir ve imzalanır. Bu mühür, biletin gerçekten senin sunucundan çıktığını kanıtlar.
3. **Rahatça Dolaşma (Authorization):** Müşteri artık her istekte şifre göstermez; sadece kolundaki bilekliği (JWT) gösterir.

> **`jwt.sign` Ne Anlama Gelir?**
> `sign` İngilizce'de "imzalamak" demektir. Kullanıcının `id` ve `role` bilgileri biletin üzerine yazılır ve gizli damgayla mühürlenir. İçinde şifre barındırmaz.

### Access Token vs Refresh Token

| | Access Token | Refresh Token |
|--|-------------|---------------|
| **Ömür** | Kısa (örn: 15 dk) | Uzun (örn: 7 gün) |
| **Depolama** | Memory (RAM) — localStorage'da değil! | HttpOnly Cookie |
| **JS Erişimi** | Evet | Hayır |
| **Kullanım** | Her API isteğinde Header'da gönderilir | Yeni Access Token almak için |

> **Neden localStorage değil Memory?**
> `localStorage` → XSS saldırısıyla çalınabilir ❌
> `HttpOnly Cookie` → JavaScript erişemez, daha güvenli ✅

### Token Akış Şeması

```
1. Login → Access Token (memory) + Refresh Token (cookie)
        ↓
2. API isteği → Header'da Access Token gönder
        ↓
3. Access Token süresi doldu
        ↓
4. Refresh Token ile yeni Access Token al
        ↓
5. Refresh Token de süresi dolduysa → tekrar login
```

### İstek Formatı

```http
GET http://localhost:5000/api/v1/protected
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

### decoded Nedir?

`decoded`, müşterinin giriş yaparken gönderdiği `req.body` (email ve şifre) değildir. `jwt.sign` ile mühürlenen biletin (içinde sadece `id` ve `role` var) Güvenlik Görevlisi tarafından açılmış, okunabilir halidir. İçinde şifre barındırmaz.

### req.cookies vs res.cookie

- Bilekliği müşteriye **verirken** → `res.cookie(...)` kullanılır
- Müşteri kapıya geldiğinde bilekliği **okurken** → `req.cookies` kullanılır

---

## 🔐 bcrypt vs crypto

| | `crypto` | `bcrypt` |
|--|---------|---------|
| **Tür** | Genel amaçlı, ham araç | Şifre hashleme için optimize |
| **Salt** | Manuel | Otomatik ekler |
| **Hız** | Hızlı | Kasıtlı olarak yavaş (brute force'u zorlaştırır) |
| **Kullanım** | Rastgele veri, genel şifreleme | Kullanıcı şifrelerini hashlemek |

---

## ⚙️ Önerilen Konfigürasyon Notları

- `MONGODB_URI` başlamadan önce set edilmeli. `src/app.ts` şu an `connectDB()` çağırıyor ve hata varsa çıkıyor.
- DB bağlantı mantığını `src/config/db.ts`'de sade tut: başlangıçta bir kez bağlan.
- Route'ları implement edip `src/app.ts`'e kaydet (şu an bağlı değil).

---

## 🏭 Production'da Nasıl Çalıştırılır

```bash
npm run build
# Ortam değişkenlerini sağla (MONGODB_URI, JWT_SECRET, ...)
npm run start
```

---

## 📋 Sonraki Adımlar

- `userController` implement et ve route'ları `app.ts`'e kaydet
- Request validation ve authentication middleware ekle
- Gerekirse database seed/migration scriptleri ekle
