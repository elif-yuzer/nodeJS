# EJS (Embedded JavaScript) — Ders Notları

## EJS Nedir?

EJS, HTML dosyalarının içine JavaScript kodu yazmana izin veren bir **template engine** (şablon motoru). Backend'den (Node.js/Express) gelen veriyi HTML sayfasına gömmek için kullanılır.

Kısacası: **Backend verisi + HTML = EJS**

---

## Kurulum

```bash
npm install ejs
```

`app.js` içinde aktif etmek için:

```js
app.set('view engine', 'ejs');
```

Bu satırdan sonra Express otomatik olarak `views/` klasörüne bakar.

---

## Klasör Yapısı

```
projem/
├── app.js              ← Express buradan çalışır
├── views/              ← EJS dosyaları BURADA olmalı
│   └── index.ejs
├── src/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── .env
```

> ⚠️ **Önemli:** `views/` klasörü `app.js` ile aynı dizinde olmalı. `src/` içine koyarsan Express bulamaz.
> Eğer farklı bir yerde olmasını istersen `app.js`'de belirtmen gerekir:
> ```js
> app.set('views', './src/views');
> ```

---

## EJS Etiketleri

### 1. `<% %>` — JavaScript Çalıştırır, Ekrana Yazmaz

```ejs
<%
  console.log('hello world')   // terminalde görünür, tarayıcıda görünmez
  let x = 5
%>
```

if, for, while gibi yapılar burada kullanılır:

```ejs
<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } %>
```

---

### 2. `<%= %>` — Güvenli Yazdırır (HTML Çalışmaz)

```ejs
<%= 5 + 9 %>                              → 14
<%= kullanici %>                           → Elif
<%= '<b>kalın</b>' %>                     → <b>kalın</b>  (düz metin olarak)
```

> 🔒 **Güvenli:** HTML taglarını çalıştırmaz, düz metin olarak yazar. Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz.

---

### 3. `<%- %>` — HTML Olarak Yazdırır (Tehlikeli Olabilir)

```ejs
<%- '<p>Selam <b>dünyalı</b></p>' %>     → Selam **dünyalı** (kalın çıkar)
```

> ⚠️ **Dikkat:** HTML tagları gerçekten çalışır. Kullanıcıdan gelen veriyi asla `<%-` ile yazma, XSS saldırısına açık olur.

---

### 4. `<%# %>` — Yorum Satırı

```ejs
<%# Bu satır hiçbir yerde görünmez %>
```

HTML yorumundan (`<!-- -->`) farkı:
- HTML yorumu → tarayıcıda kaynak kodda görünür
- EJS yorumu → hiçbir yerde görünmez, tamamen gizlenir

---

### Özet Tablo

| Etiket | Ne Yapar | Ne Zaman Kullanılır |
|--------|----------|---------------------|
| `<% %>` | JS çalıştırır, ekrana yazmaz | if, for, değişken tanımlama |
| `<%= %>` | Güvenli yazdırır, HTML çalışmaz | Değişken, hesaplama yazdırma |
| `<%- %>` | HTML olarak yazdırır | Güvenilir HTML içeriği |
| `<%# %>` | Yorum, hiç görünmez | Not almak için |

---

## Backend'den Veri Gönderme

`app.js`'de `res.render()` ile veri gönderilir:

```js
app.get('/', (req, res) => {
  res.render('index', {
    baslik: "Todo Listesi",
    kullanici: "Elif",
    yas: 25
  })
})
```

`views/index.ejs`'de kullanılır:

```ejs
<h1><%= baslik %></h1>
<p>Hoşgeldin <%= kullanici %>, yaşın: <%= yas %></p>
```

---

## Pratik Örnekler

### if/else

```ejs
<% let yas = 20 %>

<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } else { %>
  <p>Çocuksun</p>
<% } %>
```

---

### Döngü ile Liste

```ejs
<% let meyveler = ["elma", "armut", "kiraz"] %>

<ul>
  <% meyveler.forEach(meyve => { %>
    <li><%= meyve %></li>
  <% }) %>
</ul>
```

---

### Todo Listesi (Gerçek Proje Örneği)

`app.js`:
```js
app.get('/', async (req, res) => {
  const todolar = await Todo.findAll()
  res.render('index', { todolar })
})
```

`views/index.ejs`:
```ejs
<ul>
  <% todolar.forEach(todo => { %>
    <li>
      <%= todo.title %>
      <% if(todo.isDone){ %>
        ✅
      <% } else { %>
        ❌
      <% } %>
    </li>
  <% }) %>
</ul>
```

---

## console.log Nerede Görünür?

```ejs
<%
  console.log('merhaba')    ← terminalde görünür
%>
```

```ejs


<%= degisken %>             ← tarayıcıda görünür
```

> ⚠️ `console.log` EJS içinde çalışır ama çıktı **Node.js terminalinde** görünür, tarayıcı konsolunda değil.
> Ayrıca `console.log` ancak o sayfaya **istek atıldığında** çalışır. Sayfayı açmadan çalışmaz.

---

## Sık Yapılan Hatalar

| Hata | Sebebi | Çözüm |
|------|--------|-------|
| `Failed to lookup view "index"` | `views/index.ejs` yok veya yanlış yerde | `views/` klasörünü `app.js` ile aynı dizine koy |
| `<%= <p>selam</p> %>` çalışmıyor | `<%= %>` içine HTML yazılmaz | HTML'i dışarıda yaz, sadece değişkeni içine al |
| `console.log` tarayıcıda görünmüyor | EJS console.log terminale yazar | Terminale bak |
| HTML tagları ekranda metin olarak çıkıyor | `<%= %>` kullandın | HTML çalışsın istiyorsan `<%-` kullan |

---

## Best Practices

1. **Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz** — XSS saldırılarına karşı güvenli
2. **`<%- %>` sadece kendi yazdığın güvenilir içerikler için kullan**
3. **Mantık kodunu controller'da yaz, EJS'de sadece görüntüleme yap** — EJS içinde karmaşık iş mantığı olmaz
4. **`views/` klasörünü `app.js` ile aynı dizinde tut**
5. **Her sayfa için ayrı `.ejs` dosyası oluştur** — `index.ejs`, `detail.ejs`, `form.ejs` gibi
6. **Ortak parçaları `include` ile böl** (header, footer gibi):

```ejs
<%- include('partials/header') %>
  <h1>Ana Sayfa</h1>
<%- include('partials/footer') %>
```

---

## include Kullanımı

Tekrar eden HTML parçalarını ayrı dosyaya alıp her sayfaya ekleyebilirsin:

```
views/
├── index.ejs
├── partials/
│   ├── header.ejs
│   └── footer.ejs
```

`views/partials/header.ejs`:
```ejs
<!DOCTYPE html>
<html lang="tr">
<head>
  <title><%= baslik %></title>
</head>
<body>
```

`views/index.ejs`:
```ejs
<%- include('partials/header', { baslik: 'Ana Sayfa' }) %>

<h1>Merhaba!</h1>

<%- include('partials/footer') %>
```

> `include` için `<%-` kullanılır çünkü HTML içerik ekleniyor.

*****************************************


# EJS (Embedded JavaScript) — Ders Notları

## EJS Nedir?

EJS, HTML dosyalarının içine JavaScript kodu yazmana izin veren bir **template engine** (şablon motoru). Backend'den (Node.js/Express) gelen veriyi HTML sayfasına gömmek için kullanılır.

Kısacası: **Backend verisi + HTML = EJS**

---

## Kurulum

```bash
npm install ejs
```

`app.js` içinde aktif etmek için:

```js
app.set('view engine', 'ejs');
```

Bu satırdan sonra Express otomatik olarak `views/` klasörüne bakar.

---

## Klasör Yapısı

```
projem/
├── app.js              ← Express buradan çalışır
├── views/              ← EJS dosyaları BURADA olmalı
│   └── index.ejs
├── src/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── .env
```

> ⚠️ **Önemli:** `views/` klasörü `app.js` ile aynı dizinde olmalı. `src/` içine koyarsan Express bulamaz.
> Eğer farklı bir yerde olmasını istersen `app.js`'de belirtmen gerekir:
> ```js
> app.set('views', './src/views');
> ```

---

## EJS Etiketleri

### 1. `<% %>` — JavaScript Çalıştırır, Ekrana Yazmaz

```ejs
<%
  console.log('hello world')   // terminalde görünür, tarayıcıda görünmez
  let x = 5
%>
```

if, for, while gibi yapılar burada kullanılır:

```ejs
<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } %>
```

---

### 2. `<%= %>` — Güvenli Yazdırır (HTML Çalışmaz)

```ejs
<%= 5 + 9 %>                              → 14
<%= kullanici %>                           → Elif
<%= '<b>kalın</b>' %>                     → <b>kalın</b>  (düz metin olarak)
```

> 🔒 **Güvenli:** HTML taglarını çalıştırmaz, düz metin olarak yazar. Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz.

---

### 3. `<%- %>` — HTML Olarak Yazdırır (Tehlikeli Olabilir)

```ejs
<%- '<p>Selam <b>dünyalı</b></p>' %>     → Selam **dünyalı** (kalın çıkar)
```

> ⚠️ **Dikkat:** HTML tagları gerçekten çalışır. Kullanıcıdan gelen veriyi asla `<%-` ile yazma, XSS saldırısına açık olur.

---

### 4. `<%# %>` — Yorum Satırı

```ejs
<%# Bu satır hiçbir yerde görünmez %>
```

HTML yorumundan (`<!-- -->`) farkı:
- HTML yorumu → tarayıcıda kaynak kodda görünür
- EJS yorumu → hiçbir yerde görünmez, tamamen gizlenir

---

### Özet Tablo

| Etiket | Ne Yapar | Ne Zaman Kullanılır |
|--------|----------|---------------------|
| `<% %>` | JS çalıştırır, ekrana yazmaz | if, for, değişken tanımlama |
| `<%= %>` | Güvenli yazdırır, HTML çalışmaz | Değişken, hesaplama yazdırma |
| `<%- %>` | HTML olarak yazdırır | Güvenilir HTML içeriği |
| `<%# %>` | Yorum, hiç görünmez | Not almak için |

---

## Backend'den Veri Gönderme

`app.js`'de `res.render()` ile veri gönderilir:

```js
app.get('/', (req, res) => {
  res.render('index', {
    baslik: "Todo Listesi",
    kullanici: "Elif",
    yas: 25
  })
})
```

`views/index.ejs`'de kullanılır:

```ejs
<h1><%= baslik %></h1>
<p>Hoşgeldin <%= kullanici %>, yaşın: <%= yas %></p>
```

---

## Pratik Örnekler

### if/else

```ejs
<% let yas = 20 %>

<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } else { %>
  <p>Çocuksun</p>
<% } %>
```

---

### Döngü ile Liste

```ejs
<% let meyveler = ["elma", "armut", "kiraz"] %>

<ul>
  <% meyveler.forEach(meyve => { %>
    <li><%= meyve %></li>
  <% }) %>
</ul>
```

---

### Todo Listesi (Gerçek Proje Örneği)

`app.js`:
```js
app.get('/', async (req, res) => {
  const todolar = await Todo.findAll()
  res.render('index', { todolar })
})
```

`views/index.ejs`:
```ejs
<ul>
  <% todolar.forEach(todo => { %>
    <li>
      <%= todo.title %>
      <% if(todo.isDone){ %>
        ✅
      <% } else { %>
        ❌
      <% } %>
    </li>
  <% }) %>
</ul>
```

---

## console.log Nerede Görünür?

```ejs
<%
  console.log('merhaba')    ← terminalde görünür
%>
```

```ejs
<%= degisken %>             ← tarayıcıda görünür
```

> ⚠️ `console.log` EJS içinde çalışır ama çıktı **Node.js terminalinde** görünür, tarayıcı konsolunda değil.
> Ayrıca `console.log` ancak o sayfaya **istek atıldığında** çalışır. Sayfayı açmadan çalışmaz.

---

## Sık Yapılan Hatalar

| Hata | Sebebi | Çözüm |
|------|--------|-------|
| `Failed to lookup view "index"` | `views/index.ejs` yok veya yanlış yerde | `views/` klasörünü `app.js` ile aynı dizine koy |
| `<%= <p>selam</p> %>` çalışmıyor | `<%= %>` içine HTML yazılmaz | HTML'i dışarıda yaz, sadece değişkeni içine al |
| `console.log` tarayıcıda görünmüyor | EJS console.log terminale yazar | Terminale bak |
| HTML tagları ekranda metin olarak çıkıyor | `<%= %>` kullandın | HTML çalışsın istiyorsan `<%-` kullan |

---

## Best Practices

1. **Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz** — XSS saldırılarına karşı güvenli
2. **`<%- %>` sadece kendi yazdığın güvenilir içerikler için kullan**
3. **Mantık kodunu controller'da yaz, EJS'de sadece görüntüleme yap** — EJS içinde karmaşık iş mantığı olmaz
4. **`views/` klasörünü `app.js` ile aynı dizinde tut**
5. **Her sayfa için ayrı `.ejs` dosyası oluştur** — `index.ejs`, `detail.ejs`, `form.ejs` gibi
6. **Ortak parçaları `include` ile böl** (header, footer gibi):

```ejs
<%- include('partials/header') %>
  <h1>Ana Sayfa</h1>
<%- include('partials/footer') %>
```

---

## include Kullanımı

Tekrar eden HTML parçalarını ayrı dosyaya alıp her sayfaya ekleyebilirsin:

```
views/
├── index.ejs
├── partials/
│   ├── header.ejs
│   └── footer.ejs
```

`views/partials/header.ejs`:
```ejs
<!DOCTYPE html>
<html lang="tr">
<head>
  <title><%= baslik %></title>
</head>
<body>
```

`views/index.ejs`:
```ejs
<%- include('partials/header', { baslik: 'Ana Sayfa' }) %>

<h1>Merhaba!</h1>

<%- include('partials/footer') %>
```

> `include` için `<%-` kullanılır çünkü HTML içerik ekleniyor.
>
> # EJS (Embedded JavaScript) — Ders Notları

## EJS Nedir?

EJS, HTML dosyalarının içine JavaScript kodu yazmana izin veren bir **template engine** (şablon motoru). Backend'den (Node.js/Express) gelen veriyi HTML sayfasına gömmek için kullanılır.

Kısacası: **Backend verisi + HTML = EJS**

---

## Kurulum

```bash
npm install ejs
```

`app.js` içinde aktif etmek için:

```js
app.set('view engine', 'ejs');
```

Bu satırdan sonra Express otomatik olarak `views/` klasörüne bakar.

---

## Klasör Yapısı

```
projem/
├── app.js              ← Express buradan çalışır
├── views/              ← EJS dosyaları BURADA olmalı
│   └── index.ejs
├── src/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── .env
```

> ⚠️ **Önemli:** `views/` klasörü `app.js` ile aynı dizinde olmalı. `src/` içine koyarsan Express bulamaz.
> Eğer farklı bir yerde olmasını istersen `app.js`'de belirtmen gerekir:
> ```js
> app.set('views', './src/views');
> ```

---

## EJS Etiketleri

### 1. `<% %>` — JavaScript Çalıştırır, Ekrana Yazmaz

```ejs
<%
  console.log('hello world')   // terminalde görünür, tarayıcıda görünmez
  let x = 5
%>
```

if, for, while gibi yapılar burada kullanılır:

```ejs
<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } %>
```

---

### 2. `<%= %>` — Güvenli Yazdırır (HTML Çalışmaz)

```ejs
<%= 5 + 9 %>                              → 14
<%= kullanici %>                           → Elif
<%= '<b>kalın</b>' %>                     → <b>kalın</b>  (düz metin olarak)
```

> 🔒 **Güvenli:** HTML taglarını çalıştırmaz, düz metin olarak yazar. Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz.

---

### 3. `<%- %>` — HTML Olarak Yazdırır (Tehlikeli Olabilir)

```ejs
<%- '<p>Selam <b>dünyalı</b></p>' %>     → Selam **dünyalı** (kalın çıkar)
```

> ⚠️ **Dikkat:** HTML tagları gerçekten çalışır. Kullanıcıdan gelen veriyi asla `<%-` ile yazma, XSS saldırısına açık olur.

---

### 4. `<%# %>` — Yorum Satırı

```ejs
<%# Bu satır hiçbir yerde görünmez %>
```

HTML yorumundan (`<!-- -->`) farkı:
- HTML yorumu → tarayıcıda kaynak kodda görünür
- EJS yorumu → hiçbir yerde görünmez, tamamen gizlenir

---

### Özet Tablo

| Etiket | Ne Yapar | Ne Zaman Kullanılır |
|--------|----------|---------------------|
| `<% %>` | JS çalıştırır, ekrana yazmaz | if, for, değişken tanımlama |
| `<%= %>` | Güvenli yazdırır, HTML çalışmaz | Değişken, hesaplama yazdırma |
| `<%- %>` | HTML olarak yazdırır | Güvenilir HTML içeriği |
| `<%# %>` | Yorum, hiç görünmez | Not almak için |

---

## Backend'den Veri Gönderme

`app.js`'de `res.render()` ile veri gönderilir:

```js
app.get('/', (req, res) => {
  res.render('index', {
    baslik: "Todo Listesi",
    kullanici: "Elif",
    yas: 25
  })
})
```

`views/index.ejs`'de kullanılır:

```ejs
<h1><%= baslik %></h1>
<p>Hoşgeldin <%= kullanici %>, yaşın: <%= yas %></p>
```

---

## Pratik Örnekler

### if/else

```ejs
<% let yas = 20 %>

<% if(yas >= 18){ %>
  <p>Yetişkinsin</p>
<% } else { %>
  <p>Çocuksun</p>
<% } %>
```

---

### Döngü ile Liste

```ejs
<% let meyveler = ["elma", "armut", "kiraz"] %>

<ul>
  <% meyveler.forEach(meyve => { %>
    <li><%= meyve %></li>
  <% }) %>
</ul>
```

---

### Todo Listesi (Gerçek Proje Örneği)

`app.js`:
```js
app.get('/', async (req, res) => {
  const todolar = await Todo.findAll()
  res.render('index', { todolar })
})
```

`views/index.ejs`:
```ejs
<ul>
  <% todolar.forEach(todo => { %>
    <li>
      <%= todo.title %>
      <% if(todo.isDone){ %>
        ✅
      <% } else { %>
        ❌
      <% } %>
    </li>
  <% }) %>
</ul>
```

---

## console.log Nerede Görünür?

```ejs
<%
  console.log('merhaba')    ← terminalde görünür
%>
```

```ejs
<%= degisken %>             ← tarayıcıda görünür
```

> ⚠️ `console.log` EJS içinde çalışır ama çıktı **Node.js terminalinde** görünür, tarayıcı konsolunda değil.
> Ayrıca `console.log` ancak o sayfaya **istek atıldığında** çalışır. Sayfayı açmadan çalışmaz.

---

## Sık Yapılan Hatalar

| Hata | Sebebi | Çözüm |
|------|--------|-------|
| `Failed to lookup view "index"` | `views/index.ejs` yok veya yanlış yerde | `views/` klasörünü `app.js` ile aynı dizine koy |
| `<%= <p>selam</p> %>` çalışmıyor | `<%= %>` içine HTML yazılmaz | HTML'i dışarıda yaz, sadece değişkeni içine al |
| `console.log` tarayıcıda görünmüyor | EJS console.log terminale yazar | Terminale bak |
| HTML tagları ekranda metin olarak çıkıyor | `<%= %>` kullandın | HTML çalışsın istiyorsan `<%-` kullan |

---

## Best Practices

1. **Kullanıcıdan gelen veriyi her zaman `<%= %>` ile yaz** — XSS saldırılarına karşı güvenli
2. **`<%- %>` sadece kendi yazdığın güvenilir içerikler için kullan**
3. **Mantık kodunu controller'da yaz, EJS'de sadece görüntüleme yap** — EJS içinde karmaşık iş mantığı olmaz
4. **`views/` klasörünü `app.js` ile aynı dizinde tut**
5. **Her sayfa için ayrı `.ejs` dosyası oluştur** — `index.ejs`, `detail.ejs`, `form.ejs` gibi
6. **Ortak parçaları `include` ile böl** (header, footer gibi):

```ejs
<%- include('partials/header') %>
  <h1>Ana Sayfa</h1>
<%- include('partials/footer') %>
```

---

## include Kullanımı

Tekrar eden HTML parçalarını ayrı dosyaya alıp her sayfaya ekleyebilirsin:

```
views/
├── index.ejs
├── partials/
│   ├── header.ejs
│   └── footer.ejs
```

`views/partials/header.ejs`:
```ejs
<!DOCTYPE html>
<html lang="tr">
<head>
  <title><%= baslik %></title>
</head>
<body>
```

`views/index.ejs`:
```ejs
<%- include('partials/header', { baslik: 'Ana Sayfa' }) %>

<h1>Merhaba!</h1>

<%- include('partials/footer') %>
```

> `include` için `<%-` kullanılır çünkü HTML içerik ekleniyor.

/*************************/
Kullanıcı SİL butonuna basar
  ↓
Tarayıcı POST /view/3?_method=DELETE gönderir
  ↓
method-override paketi _method=DELETE görür
  ↓
POST isteğini DELETE'e çevirir
  ↓
Router DELETE /view/3 olarak algılar
  ↓
todo.delete fonksiyonu çalışır
  ↓
DB'den silinir, /view'e redirect edilir

/*************************/
Kullanıcı UPDATE formunu gönderir
  ↓
Tarayıcı POST /view/3?_method=PUT gönderir
  ↓
method-override paketi _method=PUT görür
  ↓
POST isteğini PUT'a çevirir
  ↓
Router PUT /view/3 olarak algılar
  ↓
todo.update fonksiyonu çalışır
  ↓
Controller önce kaydı DB'den bulur
  ↓
Formdan gelen alan boşsa eski değer korunur
  ↓
Dolu gelen alanlar güncellenir
  ↓
DB kaydedilir, /view'e redirect edilir

> Bu yöntemde formda boş bırakılan input'lar mevcut veriyi silmez; sadece dolu gelen alanlar update edilir.