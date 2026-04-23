"use strict";

// ============================================================
// 1. CLASS VE CONSTRUCTOR
// ============================================================

class Ogretmen {
  constructor(isim, brans) {
    this.isim = isim;
    this.brans = brans;
  }

  selamVer() {
    return `Hello my ${this.isim} and my branch is ${this.brans}`;
  }
}

const newOgretmen = new Ogretmen("Elif", "Computer Science");
console.log(newOgretmen);
console.log(newOgretmen.selamVer());

// ============================================================
// 2. INHERITANCE (KALITIM)
// ============================================================

// Ana Sınıf (Parent)
class User {
  isActive = false;

  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const newUser = new User("Pinar", "pinar@blog.com");
console.log(newUser);

// Alt Sınıf (Child) — super() ile ebeveyn constructor çağrılır
class Author extends User {
  constructor(name, email, bio) {
    super(name, email);
    this.bio = bio;
  }
}

const newAuthor = new Author("Person", "kahlo@gmail.com", "coffee lover");
console.log(newAuthor);

// Rol tabanlı kullanıcı
class UserWithRole extends User {
  constructor(name, email, isAdmin = false) {
    super(name, email);
    this.isAdmin = isAdmin;
  }
}

const sonKullanici = new UserWithRole("Elif", "elif@gmail.com", true);
console.log(sonKullanici);

// Blog kalıtımı
class Blog {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

class MyBlog extends Blog {
  constructor(title, content, bio) {
    super(title, content);
    this.bio = bio;
  }
}

const myData = new MyBlog(
  "inheritance konusu",
  "oop konusunu sevmeye basladım",
  "OOP öğrenme"
);
console.log(myData);

// ============================================================
// 3. SYMBOL İLE GİZLEME
// for...in ve Object.keys() Symbol'leri görmez
// ============================================================

const hidden_id = Symbol("id");

class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

class SponsoredPost extends Post {
  constructor(title, content, budget) {
    super(title, content);
    this[hidden_id] = budget; // Bracket notasyonu — Symbol referansını kullanır
  }
}

const newPost = new SponsoredPost("OOP Gecesi", "Harika şeyler öğreniyoruz!", 1500);

console.log("--- for...in (Symbol görünmez) ---");
for (let i in newPost) {
  console.log("bulunan etiket:", i);
}

// Object.keys / values örneği
const sym = Symbol();
const expObj = {
  ad: "Elif",
  id: 3,
  [sym]: 4, // Object.keys bunu atlar
};

Object.keys(expObj).forEach((prop) => console.log(`${prop}: ${expObj[prop]}`));
console.log("keys:", Object.keys(expObj));
console.log("values:", Object.values(expObj));

const newA = Object.keys(expObj);
const newAA = newA.filter((a) => a !== "id");
newAA[0] = "soyad";
console.log("filtreli dizi:", newAA);
console.log("orijinal obje etkilenmedi:", Object.keys(expObj));

// ============================================================
// 4. instanceof OPERATÖRÜ
// "Bu nesnenin genetiğinde şu sınıfın prototipi var mı?"
// ============================================================

class Car {
  constructor() {}
}

const car1 = new Car();
const car2 = new Car();

console.log("Car instance mi?", car1 instanceof Car);   // true
console.log("Array instance mi?", car1 instanceof Array); // false

// ============================================================
// 5. GETTER VE SETTER
// Nesnelerin verilerini koruyan "Güvenlik Görevlileri" 🛡️
// _ (alt çizgi) = yalancı kapsülleme, sadece bir gelenek
// ============================================================

class NewBlog {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this._status = "taslak";
  }

  get status() {
    return this._status;
  }

  set status(yeniDurum) {
    const gecerliDurumlar = ["taslak", "incelemede", "yayında"];
    if (!gecerliDurumlar.includes(yeniDurum)) {
      throw new Error(
        `Güvenlik Uyarısı: '${yeniDurum}' geçerli bir makale durumu değil!`
      );
    }
    this._status = yeniDurum;
  }
}

const blog = new NewBlog("Başlık", "İçerik");
console.log(blog.status);        // taslak
blog._status = "incelemede";     // _ ile doğrudan erişim (koruma yok!)
console.log(blog.status);        // incelemede
blog.status = "yayında";         // setter üzerinden (kontrollü)
console.log(blog.status);        // yayında

try {
  blog.status = "yayınlandı";    // Geçersiz durum → hata fırlatır
} catch (err) {
  console.log("Hata yakalandı:", err.message);
}

// ============================================================
// 6. TRUE ENCAPSULATION — PRIVATE FIELD (#)
// GÖREV 1: #views — dışarıdan değiştirilemez, sadece get ile okunur
// ============================================================

class PostWithViews {
  #views = 5000; // Gerçek gizli alan — sınıf dışından erişilemez

  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  get views() {
    return `Görüntülenme sayısı: ${this.#views}`;
  }
}

const ornek = new PostWithViews("Yenilik", "Ne yapıyorum?");
console.log(ornek.content);
console.log(ornek.views);
// ornek.#views = 999; // SyntaxError! Erişilemez

// ============================================================
// 7. STATIC — GÖREV 2: Fabrika Sayacı
// static = nesneye değil, sınıfa (fabrikaya) aittir
// this değil, sınıf adı kullanılır!
// ============================================================

class BlogPost {
  static toplamMakale = 0;

  constructor(title, content) {
    this.title = title;
    this.content = content;
    BlogPost.toplamMakale++; // Fabrikanın panosunu güncelle
  }
}

console.log("Başlangıç:", BlogPost.toplamMakale); // 0
const yazi1 = new BlogPost("OOP Nedir?", "OOP çok zevkli...");
const yazi2 = new BlogPost("Static Kullanımı", "Fabrika mantığı...");
console.log("2 yazı sonrası:", BlogPost.toplamMakale); // 2

// ============================================================
// 8. STATIC METOT — KOPYA DEDEKTÖRÜ
// constructor içinde değil! İstediğimiz anda çağırırız.
// Analoji: constructor = Doğumhane | static kopyaMi = DNA Lab 🔬
// ============================================================

class Postt {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  static kopyaMi(p1, p2) {
    if (p1.title === p2.title && p1.content === p2.content) {
      console.log("Makaleler aynı (kopya)!");
      return true;
    }
    console.log("Makaleler farklı.");
    return false;
  }
}

const makaleA = new Postt("Javascript OOP", "Bugün static öğrendik.");
const makaleB = new Postt("Javascript OOP", "Bugün static öğrendik.");
const makaleC = new Postt("HTML Temelleri", "Sadece etiketlerdir.");

console.log("A-B kopya mı?", Postt.kopyaMi(makaleA, makaleB)); // true
console.log("A-C kopya mı?", Postt.kopyaMi(makaleA, makaleC)); // false

// ============================================================
// 9. GÖREV 3: MIRAS VE PRIVATE ALAN ERİŞİMİ
// Alt sınıf, üst sınıfın #views alanına doğrudan erişemez!
// Üst sınıfın get metodu üzerinden erişmesi gerekir.
// ============================================================

class ParentPost {
  #views = 1000;

  constructor(title) {
    this.title = title;
  }

  get views() {
    return this.#views; // Kapı burada açılıyor
  }
}

class VideoPost extends ParentPost {
  constructor(title, videoUrl) {
    super(title);
    this.videoUrl = videoUrl;
  }

  getViews() {
    return this.views; // this.#views değil! get metodu kullanılır
  }
}

const video = new VideoPost("OOP Videosu", "youtube.com/oop");
console.log("VideoPost görüntülenme:", video.getViews()); // 1000