# 📐 Commit Kuralları

---

## Format

```
<prefix>(<kapsam>): <kısa açıklama>

<detay - opsiyonel>
```

### Örnek
```
feat(auth): add login endpoint

- JWT accessToken ve refreshToken üretimi eklendi
- bcrypt ile şifre karşılaştırması yapıldı
```

---

## Prefix Listesi

| Prefix | Ne Zaman Kullanılır |
|--------|----------------------|
| `feat` | Yeni özellik eklendi |
| `fix` | Hata düzeltildi |
| `refactor` | Kod yeniden düzenlendi, davranış değişmedi |
| `chore` | Paket kurulumu, config, proje yapısı |
| `docs` | README, yorum, dokümantasyon |
| `style` | Formatlama, boşluk, noktalı virgül (mantık değişmedi) |
| `test` | Test eklendi veya düzenlendi |
| `perf` | Performans iyileştirmesi |
| `revert` | Önceki commit geri alındı |

---

## Kapsam (Scope) Önerileri

```
feat(auth):      → kimlik doğrulama
feat(user):      → kullanıcı işlemleri
feat(post):      → gönderi işlemleri
feat(category):  → kategori işlemleri
feat(middleware): → middleware
feat(db):        → veritabanı
feat(router):    → route tanımlamaları
fix(auth):       → auth ile ilgili hata düzeltme
```

---

## Kurallar

- [ ] Türkçe değil **İngilizce** yaz
- [ ] Geçmiş zaman değil **şimdiki zaman** kullan → `added` ❌ `add` ✅
- [ ] Büyük harfle başlama → `Add login` ❌ `add login` ✅
- [ ] Nokta koyma → `add login.` ❌ `add login` ✅
- [ ] 72 karakteri geçme
- [ ] Her commit **tek bir konuya** odaklanmalı
- [ ] Yarım kalan iş için commit atma

---

## Sık Kullanılan Kalıplar

```
feat(user): add user model
feat(auth): add register and login service
feat(auth): add JWT token generation
feat(middleware): add error handler
feat(middleware): add auth guard
fix(auth): fix password comparison logic
fix(router): fix missing route export
refactor(auth): extract token logic to separate util
chore: add dotenv and bcrypt packages
chore: setup express and mongoose connection
docs: add README and commit rules
```

---

## Kötü ❌ → İyi ✅

```
// ❌
"değişiklik yaptım"
"fix"
"update"
"wip"

// ✅
"fix(auth): handle null user on login"
"feat(user): add email validation"
"refactor(db): extract connection to utility function"
```

---

> **Altın kural:** Commit mesajını okuyunca ne değiştiğini anlamalısın,  
> kodu açmana gerek kalmamalı.