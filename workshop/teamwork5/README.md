# 🗄️ Clarusway Backend Workshop - 5

## 📌 Konu: Mongoose / MongoDB

---

## 🎯 Öğrenme Hedefleri

- Mongoose kullanarak NoSQL veritabanlarıyla çalışabilme becerisi kazanmak.

---

## 📖 Giriş

Backend geliştiricilerinin bilmesi gereken önemli konulardan biri SQL ve NoSQL veritabanlarıyla çalışabilmektir.
Bu çalışma kapsamında NoSQL veritabanları için **Mongoose** kullanımı üzerine çalışmalar yapılacaktır.

---

## ⚙️ Gereksinimler

- VSCode
- Node.js
- MongoDB

---

## ❓ Sorular & Cevaplar

### 1. ODM Nedir?

**ODM** (Object Data Modeling), JavaScript nesneleri ile MongoDB dokümanları arasında ilişki kurmayı sağlayan bir yapıdır.
**Mongoose**, MongoDB için kullanılan popüler bir ODM kütüphanesidir.

---

### 2. Mongoose ile MongoDB'ye nasıl bağlanılır?

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(() => console.log("MongoDB Bağlantısı Başarılı"))
    .catch((err) => console.log(err));
```

---

### 3. Mongoose modeli nedir? Basit bir örnek verin.

**Model**, MongoDB koleksiyonlarıyla etkileşim kurmak için kullanılan yapıdır. **Schema** üzerinden oluşturulur.

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model("User", userSchema);
```

---

### 4. Mongoose'da `findOne()` ve `find()` metodları arasındaki fark nedir?

| Metod | Açıklama |
|---|---|
| `findOne()` | Şarta uyan **ilk** dokümanı getirir |
| `find()` | Şarta uyan **tüm** dokümanları dizi (array) olarak getirir |

```js
// Şarta uyan ilk dokümanı getirir
User.findOne({ username: "john" });

// Şarta uyan tüm dokümanları getirir
User.find({ isActive: true });
```

---

### 5. Mongoose'da middleware nedir ve nasıl kullanılır?

**Middleware**, belirli işlemlerden **önce veya sonra** çalışan fonksiyonlardır.

Yaygın kullanım alanları:
- `save` işleminden önce şifre hashleme
- `delete` işleminden sonra log tutma

```js
userSchema.pre("save", function(next) {
    console.log("Kayıt Öncesi Çalışıyor");
    next();
});
```

---

### 6. Mongoose'da `populate` metodunun amacı nedir?

`populate()` metodu, **ilişkili dokümanları getirmek** için kullanılır. Başka koleksiyonlara referans verilen verileri otomatik olarak doldurur.

```js
Post.find().populate("user");
```

---

### 7. Mongoose, MongoDB üzerinde **`CRUD`** işlemleri gerçekleştirir.

> **C**reate (Oluşturma) · **R**ead (Okuma) · **U**pdate (Güncelleme) · **D**elete (Silme)

---

### 8. Mongoose şemalarındaki `required` seçeneği, bir alanın **zorunlu** olup olmadığını belirtir.

```js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});
```

---

### 9. Bir dokümanın özelliklerini güncellemek için `updateOne()` veya `findByIdAndUpdate()` metodları kullanılır.

```js
// Şarta göre güncelleme
User.updateOne({ username: "john" }, { email: "yeni@email.com" });

// ID'ye göre bulup güncelleme
User.findByIdAndUpdate("64abc123", { email: "yeni@email.com" });
```

---

### 10. Belirli bir şarta göre doküman bulmak ve silmek için `deleteOne()` veya `findOneAndDelete()` metodları kullanılır.

```js
// Şarta göre silme
User.deleteOne({ username: "john" });

// Bulup silme
User.findOneAndDelete({ username: "john" });
```

---

---

# 🤝 Backend Takım Çalışması - 5

## 📌 Konu: Express Proje Yapısı

---

## 🎯 Öğrenme Hedefleri

Express.js proje yapısının nasıl organize edildiğini öğrenmek ve takım çalışmasında verimliliği artırmak.

---

## 📖 Giriş

Proje organizasyonu özellikle büyük ekiplerde tutarlılığı korumaya yardımcı olur.

Tutarlı proje yapısı:
- Kodun nerede bulunacağını **öngörülebilir** hale getirir
- Takım **verimliliğini** artırır
- Bakımı **kolaylaştırır**

---

## ⚙️ Gereksinimler

- VSCode
- Node.js
- MongoDB

---

## 🚀 Başlayalım

### Takım Görevleri

İlk olarak görev paylaşımı yapın ve teamwork süresi boyunca adım adım ilerleyin.

---

### Adım 1 — Proje Seçimi

Çalışacağınız bir proje seçin.

> **Örnek:** `blogapp`

---

### Adım 2 — Yapıyı Düzleştirme

**Takım lideri** veya bir gönüllü:

- Seçilen projenin klasör yapısını kaldırır
- Projeyi **tek bir dosya** haline getirir

---

### Adım 3 — Yapıyı Yeniden Oluşturma

Takım üyeleri teamwork saatinde bir araya gelerek:

- Tek dosya halindeki projeyi alır
- Önerilen proje yapısına **adım adım** dönüştürür

---

### Adım 4 — Tartışma & Öğrenme

Bu süreçte takım şunları birlikte tartışır:

- Her **kod bloğunun** amacı
- Her **klasörün** görevi
- Genel **dosya organizasyonu**

---

## ✅ Opsiyonel Genişletilmiş İş Akışı

```
1. Takım lideri, tek dosyaya dönüştürülmüş projeyi ortak repoya yükler
2. Takım, ortak bir proje yapısında anlaşır
3. Görev dağılımı yapılır
4. Her ekip üyesi kendi görevini tamamlar
5. Her üye Pull Request açar
6. Takım lideri kodu inceler (review)
7. Takım lideri merge işlemini gerçekleştirir
```

---

---

# 📋 Git Komutları Rehberi

## 1. Git Başlatma

```bash
# Yeni proje için Git başlatır
git init
```

## 2. Repository Klonlama

```bash
# GitHub'daki projeyi bilgisayara indirir
git clone <repo-url>

# Örnek
git clone https://github.com/kullanici/proje.git
```

## 3. Durum Kontrolü

```bash
# Değişen, staged ve untracked dosyaları gösterir
git status
```

## 4. Dosya Ekleme

```bash
# Tek dosyayı stage alanına ekler
git add dosyaAdi.js

# Tüm dosyaları ekler
git add .
```

## 5. Commit Atma

```bash
# Yapılan değişiklikleri bir mesajla kaydeder
git commit -m "User model oluşturuldu"
```

## 6. Branch İşlemleri

```bash
# Branch listesini gösterir
git branch

# Yeni branch oluşturur
git branch feature-login

# Branch değiştirir
git checkout feature-login

# Yeni branch oluşturup direkt geçer
git checkout -b feature-login
```

## 7. GitHub'a Gönderme

```bash
# Remote repository bağlar
git remote add origin <repo-url>

# Kodları GitHub'a gönderir
git push origin main

# İlk gönderimde (upstream ayarlar)
git push -u origin main
```

## 8. GitHub'dan Güncel Kod Çekme

```bash
# Uzak repodaki değişiklikleri çeker ve birleştirir
git pull origin main
```

## 9. Commit Geçmişi

```bash
# Tüm commit geçmişini gösterir
git log

# Kısa ve öz görünüm
git log --oneline
```

## 10. Değişiklikleri Görme

```bash
# Stage edilmemiş değişiklikleri gösterir
git diff
```

## 11. Stage'den Çıkarma

```bash
# Dosyayı staged alandan geri çıkarır
git restore --staged dosya.js
```

## 12. Dosya Değişikliğini Geri Alma

```bash
# Dosyadaki son değişikliği iptal eder
git restore dosya.js
```

## 13. Son Commit'i Düzenleme

```bash
# Son commit mesajını değiştirir
git commit --amend
```

## 14. Merge İşlemi

```bash
# Belirtilen branch'i mevcut branch'e birleştirir
git merge feature-login
```

## 15. Branch Silme

```bash
# Local branch siler
git branch -d feature-login

# Remote branch siler
git push origin --delete feature-login
```

---

## ⚡ Sık Kullanılan İş Akışları

### Günlük Kullanım

```bash
git status
git add .
git commit -m "mesaj"
git push
```

### Takım Özellik Geliştirme

```bash
git checkout -b feature-auth
git add .
git commit -m "auth oluşturuldu"
git push origin feature-auth
```

---

## 🔧 Git Yapılandırması

```bash
# Kullanıcı adı ayarla
git config --global user.name "Ad Soyad"

# Email ayarla
git config --global user.email "mail@example.com"

# Tüm yapılandırmayı görüntüle
git config --list
```

---

## 📚 Temel Git Kavramları

| Kavram | Açıklama |
|---|---|
| **Repository** | Proje deposu |
| **Commit** | Kayıt noktası |
| **Branch** | Ayrı çalışma alanı |
| **Merge** | Branch birleştirme |
| **Clone** | Repo kopyalama |
| **Push** | GitHub'a gönderme |
| **Pull** | GitHub'dan çekme |
| **Stage** | Commit öncesi hazırlık alanı |

---

> ☺ Katıldığınız için Teşekkürler ✍ **Clarusway**