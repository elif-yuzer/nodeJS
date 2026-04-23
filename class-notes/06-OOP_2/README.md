### 1. OOP
```

``` ## 1.1 PARTS OF OOP
Before diving into JavaScript, let's take a moment to review what people mean when
they say "object-oriented", and what the main features of this programming style are.
Here's a list of concepts that are most often used when talking about object-oriented
programming (OOP):
• Object, method, and property
• Class
• Encapsulation
• Aggregation
• Reusability/inheritance
• Polymorphism

```
```1.2 DEFINITON OF METHOD ,PROPERTY AND OBJECT
As the name object-oriented suggests, objects are important. An object is a
representation of a "thing" (someone or something), and this representation is
expressed with the help of a programming language. The thing can be anything—a
real-life object, or a more convoluted concept. Taking a common object like a cat
for example, you can see that it has certain characteristics (color, name, weight, and
so on) and can perform some actions (meow, sleep, hide, escape, and so on). The
characteristics of the object are called properties in OOP-speak, and the actions are
called methods.
```

``` 1.3 CLASSES
In OOP, a class is a blueprint, or a recipe for an object. Another name for
"object" is "instance", so we say that the eagle is one concrete instance of the general
class Birds
 You can create different objects using the same class, because a class is
just a template, 

### INHERITENCE JAVASCRİPTTEKI OO KAVRAMI DIGER DILLERDEN FARKLI
Yani super(), babanın (Parent) hafızasını ve yeteneklerini o anki yeni nesneye aktaran bir köprüdür.
2. this: Canlı ve Kanlı Nesne 🏠

this ise o "ödünç aldığın" her şeyin birleştiği son hali, yani o an elinde tuttuğun nesnedir.
```
Kedi Analojisine Göre Symbol

Metindeki dilbilgisi benzetmesine geri dönersek:

Kedi (Object): İsim (Noun)

 Siyah (Property/Renk): Sıfat (Adjective)

Uyumak (Method): Fiil (Verb)

Symbol: Bu kedinin üzerindeki "Görünmez Çip" gibidir.

Çip bir fiil (eylem) değildir.

Çip bir sıfat da değildir (çünkü dışarıdan bakınca "siyah" olduğu görülür ama "çip numarası" görülmez).

Çip, kedinin kimliğini belirleyen eşsiz bir tanımlayıcıdır.

```

        
        # 🧠 JavaScript OOP — Ders Notları

## 📌 İçindekiler
1. [Class ve Constructor](#1-class-ve-constructor)
2. [Inheritance (Kalıtım)](#2-inheritance-kalıtım)
3. [Symbol ile Gizleme](#3-symbol-ile-gizleme)
4. [instanceof Operatörü](#4-instanceof-operatörü)
5. [Getter ve Setter](#5-getter-ve-setter)
6. [True Encapsulation — Private Field (#)](#6-true-encapsulation--private-field-)
7. [Static Özellikler](#7-static-özellikler)
8. [Static Metot — Kopya Dedektörü](#8-static-metot--kopya-dedektörü)
9. [Görevler ve Sorular](#9-görevler-ve-sorular)

---

## 1. Class ve Constructor

```js
class Ogretmen {
  constructor(isim, brans) {
    this.isim = isim;
    this.brans = brans;
  }
  selamVer() {
    return `Hello my ${this.isim} and my branch is ${this.brans}`;
  }
}
```

> `constructor` → Nesne ilk üretildiğinde otomatik çalışır. `this` → "benim" anlamına gelir, o anki nesneyi temsil eder.

---

## 2. Inheritance (Kalıtım)

```js
class User {
  isActive = false;
  constructor(name, email) { ... }
}

class Author extends User {
  constructor(name, email, bio) {
    super(name, email); // Ebeveyn sınıfın constructor'ını çağırır
    this.bio = bio;
  }
}
```

> `extends` → Alt sınıf üst sınıftan miras alır.  
> `super()` → Ebeveynin constructor'ını çağırır, önce o çalışır.

---

## 3. Symbol ile Gizleme

```js
const hidden_id = Symbol("id");

class SponsoredPost extends Post {
  constructor(title, content, budget) {
    super(title, content);
    this[hidden_id] = budget; // for...in ile görünmez
  }
}
```

> **Nokta notasyonu (this.hidden_id):** JavaScript, yazdığın kelimeyi string olarak arar.  
> **Bracket notasyonu (this[hidden_id]):** Symbol referansını kullanır, string'e dönüştürmez.  
> `for...in` ve `Object.keys()` → Yalnızca string etiketleri döner, Symbol'leri atlar.

---

## 4. instanceof Operatörü

```js
car1 instanceof Car   // true  → Car sınıfının prototipi var mı?
car1 instanceof Array // false → Array soyundan gelmiyor
```

> **Anlam:** "Bu canlı nesnenin genetiğinde, şu sınıfın prototipi var mı?"

---

## 5. Getter ve Setter

```js
class newBlog {
  constructor(title, content) {
    this._status = "taslak"; // _ → "yalancı kapsülleme" (sadece gelenek)
  }

  get status() { return this._status; }

  set status(yeniDurum) {
    const gecerliDurumlar = ["taslak", "incelemede", "yayında"];
    if (!gecerliDurumlar.includes(yeniDurum)) {
      throw new Error(`'${yeniDurum}' geçerli bir durum değil!`);
    }
    this._status = yeniDurum;
  }
}
```

> Getter ve Setter → Nesnelerin içindeki verileri koruyan **"Güvenlik Görevlileri"** 🛡️  
> `_status` → Sadece bir gelenek, dışarıdan hâlâ erişilebilir. Gerçek gizlilik için `#` kullan.

---

## 6. True Encapsulation — Private Field (#)

```js
class Post {
  #views = 0; // Gerçek gizli alan — sınıf dışından erişilemez

  get views() {
    return `Görüntülenme sayısı: ${this.#views}`;
  }
}
```

> `#views` → Sadece sınıf içinden erişilebilir. Alt sınıf bile `this.#views` diyemez.  
> `_views` (alt çizgi) → Sadece gelenek, gerçek koruma sağlamaz.

---

## 7. Static Özellikler

```js
class Blog {
  static toplamBlog = 0;

  constructor(title, content) {
    this.title = title;
    this.content = content;
    Blog.toplamBlog++; // this değil, sınıf adı kullanılır!
  }
}

console.log(Blog.toplamBlog); // Nesne üzerinden değil, sınıf üzerinden okunur
```

> `static` → Nesneye değil, **fabrikaya (sınıfa)** aittir.  
> `this.toplamBlog` yazılamaz → `this` "benim" demektir, fabrika sayacı kimsenin şahsi malı değildir.  
> **Analoji:** Fabrikanın duvarındaki pano — her üretimde artar, ama hiçbir ürüne ait değildir.

---

## 8. Static Metot — Kopya Dedektörü

```js
class Post {
  static kopyaMi(p1, p2) {
    return p1.title === p2.title && p1.content === p2.content;
  }
}

Post.kopyaMi(makaleA, makaleB); // İki nesneyi karşılaştırır
```

> **Neden constructor içinde değil?**  
> `constructor` sadece üretim anında çalışır. Kopya kontrolünü her zaman değil, istediğimiz anda yapmak isteriz.  
> **Analoji:** `constructor` = Doğumhane | `static kopyaMi` = DNA Test Laboratuvarı 🔬

---

## 9. Görevler ve Sorular

### Görev 1 — True Encapsulation (Private #views)
> `#price` mantığını kullanarak blog yazısının görüntülenme sayısını dışarıdan değiştirilemez hale getir. Sadece `get` ile okunabilsin.  
> ✅ **Çözüm:** Yukarıdaki bölüm 6'ya bak.

---

### Görev 2 — Fabrika Sayacı (Static)
> Toplam kaç `Post` üretildiğini takip et. Her yeni nesne üretildiğinde sayacı 1 artır.
```js
static toplamMakale = 0;
constructor(...) {
  Post.toplamMakale++;
}
```

---

### Görev 3 — Miras ve Private Alan Erişimi
> `VideoPost extends Post` olsaydı, alt sınıf `this.#views` diyerek üst sınıfın private alanına erişebilir miydi?

**Hayır, erişemez.** `#views` sadece tanımlandığı sınıfa aittir.  
Alt sınıf erişmek istiyorsa, üst sınıfın bir `get` metodu sunması gerekir.

```js
// ✅ Doğru yol
class Post {
  #views = 0;
  get views() { return this.#views; } // Alt sınıf bunu kullanır
}

class VideoPost extends Post {
  getViews() {
    return this.views; // this.#views değil!
  }
}
```