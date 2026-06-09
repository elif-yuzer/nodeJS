# JWT Authentication — Özet Notlar

## JWT Nedir?

JSON Web Token — kullanıcı giriş yaptıktan sonra sunucunun verdiği dijital kimlik kartı. Sunucu her istekte veritabanına gitmeden bu kartı doğrulayabilir.

---

## İki Token, İki Görev

|                   | Access Token                   | Refresh Token              |
| ----------------- | ------------------------------ | -------------------------- |
| Ömür              | 5–15 dakika                    | Saatler / günler           |
| Nerede tutulur    | Bellekte (state)               | `httpOnly` cookie          |
| JS erişebilir mi? | Evet — bu yüzden bellekte      | Hayır — cookie JS'e kapalı |
| Görevi            | API isteklerinde kimlik kanıtı | Yeni access token almak    |

> **Kural:** Access token'ı `localStorage`'a yazma. JS erişebiliyorsa hacker da erişebilir.

---

## JWT'nin Anatomisi

```
eyJhbGciOiJIUzI1NiJ9 . eyJ1c2VySWQiOiIxMjMifQ . SflKxwRJSMeKKF2Q...
      HEADER                    PAYLOAD                  SIGNATURE
```

- **Header** — algoritma bilgisi (`HS256`)
- **Payload** — taşınan veri (`userId`, `role`, `exp`, `iat`)
- **Signature** — `HMAC(header + payload, SECRET_KEY)` — değiştirilmedi kanıtı

> ⚠ Payload **şifrelenmez**, sadece Base64 encode edilir. Herkes okuyabilir. Şifre, kart numarası gibi hassas veri koyma.

---

## Akış

### 1. Giriş

Kullanıcı email + şifre gönderir → sunucu doğrular → **access token** (JSON) + **refresh token** (`httpOnly` cookie) döner.

### 2. Korumalı API İsteği

Client her istekte `Authorization: Bearer <token>` header'ı gönderir → middleware imzayı doğrular → route çalışır.

### 3. Token Yenileme

Access token süresi dolunca 401 gelir → client `/refresh` endpoint'ine gider → sunucu `httpOnly` cookie'deki refresh token'ı okur, DB'de kontrol eder → yeni access token döner.

### 4. Çıkış

Sunucu refresh token'ı DB'den siler → erken sonlandırma sağlanır.

---

## JWT vs Session + Redis

|                           | JWT                     | Session + Redis           |
| ------------------------- | ----------------------- | ------------------------- |
| Sunucu bir şey saklar mı? | Hayır (stateless)       | Evet — session verisi     |
| Kullanıcıya ne gider?     | Token'ın kendisi        | Sadece `session_id`       |
| Ölçekleme                 | Kolay                   | Redis cluster gerekebilir |
| Ne zaman tercih edilir?   | Microservice, edge, API | Basit monolitik uygulama  |

> Redis bir token türü değil, session verisini hızla saklamak için kullanılan in-memory veritabanıdır.

---

## Güncel Notlar (2025)

- `jsonwebtoken` yerine **`jose`** tercih ediliyor — Web Crypto API kullandığı için Node, Deno, Bun ve edge runtime'larda çalışıyor.
- **Refresh token rotation:** Her kullanımda refresh token yenilenir. Eski token tekrar kullanılırsa tüm oturum sonlandırılır.
- Access token süresi genellikle **15 dakika**, güvenlik kritik uygulamalarda **5 dakika**.
  jose vs doğrudan JWT kütüphaneleri
  Videon muhtemelen jsonwebtoken gibi eski bir Node.js-only kütüphaneyi gösteriyordur. jose ise daha modern bir alternatif.
  Temel fark şu:
  Eski yöntem (jsonwebtoken paketi):

Sadece Node.js'te çalışır
CommonJS tabanlı
Sadece JWT destekler

jose paketi:

Node.js, tarayıcı, Deno, Bun, Cloudflare Workers — her yerde çalışır
Web Crypto API kullanır (tarayıcıların yerleşik kripto sistemi)
JWT'nin ötesinde JWS, JWE, JWK gibi tüm JOSE standartlarını destekler
Sıfır dependency, tree-shakeable ESM

Neden daha popüler oldu?
Next.js, Cloudflare Workers, Edge Runtime gibi "edge" ortamlar Node.js API'lerine erişemez. jsonwebtoken bu ortamlarda çalışmaz. jose ise çalışır. Bu yüzden modern projelerde standart haline geldi.

bcrypt yerıne NODE JS in builtin kutuphanesi olan crypto yu kullandm SECRET KEY uretme kodu :# Şu an pizza-api klasöründesin, direkt şunu yaz:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

🧂 keyCode (SECRET_KEY): Bu bizim ekstra gizli baharatımızdır (kriptografide buna "salt/tuz" denir). İki farklı kullanıcı "123456" gibi zayıf ve aynı şifreyi seçse bile, sistem her şifrenin sonuna bu gizli anahtarı ekleyip öyle şifrelediği için veritabanında ikisi de tamamen farklı ve karmaşık görünür.

🔄 loopCount (PASS_ITERATION - 100.000): Şifrenin ve baharatın mikserde kaç defa üst üste karıştırılacağını belirtir. Bizim sunucumuz için 100.000 tur işlemi yapmak milisaniyeler sürer. Ancak bir hacker deneme-yanılma (brute-force) yöntemiyle saniyede milyonlarca şifre denemeye kalktığında, her bir deneme için 100.000 tur karıştırma işlemini beklemek zorunda kalır. Bu, hacker'ın işini imkansız derecede yavaşlatır.

📏 charCount (PASS_KEYLEN - 32): İşlem bittiğinde ortaya çıkacak olan şifrelenmiş sonucun kaç byte uzunluğunda olacağını belirler.

🌪️ encType (PASS_DIGEST - "sha512"): Malzemeleri karıştırmak için kullandığımız makinenin modelidir. SHA-512, veriyi geri döndürülemez şekilde parçalayan ve günümüzde endüstri standardı olan çok güçlü bir algoritmadır.
