//! OBJECTS
"use-strict";

const expObj = {
  propertName: "value", //attribute, filed

  methodName: function () {
    return "methodName is a function";
  },
  methodAlternative() {
    return "methodAlternative is a function";
  },
};

console.log(expObj.propertName);
console.log(expObj.methodName());

console.log(expObj.methodAlternative());

/* setInterval(() => {
  console.log("ali");
}, 2000);
 */ console.log("VERSION 1");

const Car = {
  brand: "Volvo",
  model: "XC90",
  isAutoGear: true,
  colors: ["black", "white"],
  detail: {
    color1: "purple",
    color2: "white",
    engineSize: 5000,
  },

  startEngine(param1) {
    console.log(param1);
    return "gonderdiğim parametreyi ekrana bas";
  },

  getDetails: function () {
    return this.detail;
  },
};

console.log(Car.brand);
console.log(Car["brand"]);
console.log(Car["detail"].color2);
console.log(Car.detail.color1);
console.log(Car["startEngine"](0));

console.log(Car.getDetails());

const detailbox = Car.getDetails();

/* Bu durum, JavaScript'in ve nesne yönelimli programlamanın en kritik kurallarından biri olan Referans (Reference) mantığını kanıtlar.

JavaScript'te nesneleri (objects) veya dizileri (arrays) bir değişkene atadığında, sistem o verinin yepyeni bir kopyasını oluşturmaz. Bunun yerine, orijinal veriyi gösteren bir bağlantı, bir nevi "uzaktan kumanda" verir.
 */
detailbox.color1 = "degiştirdm";
console.log(detailbox);
console.log(Car.getDetails());

//*bu noktada orjinale dokunmadan bagımsız yepyenı bır kopya kutu olusturulabilir ... ile

const kopyaVerisi = { ...detailbox, color1: "SWART" };
console.log(kopyaVerisi);

console.log(Car.getDetails());

const sinavSonucu = {
  isim: "",
  ders: "",
  notlar: {
    vize: null,
    final: null,
    brans: [],
    ogretmenler: {
      cinsiyet: null,
      brans: null,
    },
  },
};

const guncelSonuc = {
  ...sinavSonucu,
  isim: "Eda",
  itiraz: true,

  notlar: {
    ...sinavSonucu.notlar,
    final: 23,
  },
};
console.log(guncelSonuc);
console.log(sinavSonucu);

const yeniGuncel = {
  ...sinavSonucu,
  ders: "OOP",
  notlar: {
    ...sinavSonucu.notlar,
    vize: 47,
    final: 99,
    brans: [1, 2, 3],
    ogretmenler: {
      ...sinavSonucu.notlar.ogretmenler,
      cinsiyet: "kadın",
      brans: "tec",
    },
  },
};
/* unun sebebi, Nesne Yönelimli Programlamanın (OOP) kalbindeki Kalıp (Class) ile Üretilen Nesne (Instance) arasındaki farktır. Bunu şöyle düşünebiliriz:

    User: Bir otomobil fabrikasının mimari çizimidir (soyut bir kalıp). Çizim kağıdının bir adı, rolü veya profili yoktur.

    newUser: O çizimden new kelimesiyle üretilmiş, banttan inmiş, "Elif" adında ve "admin" rolünde olan fiziksel bir varlıktır (somut nesne).
console.log(yeniGuncel); */

//? nesne birleştirme(composition)
class User {
  constructor(name, email, password, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  getProfile() {
    return `Adım ${this.name} rolum ${this.role} sifrem ${this.password}`;
  }
}

const newUser = new User("Elif", "elif@gmail.com", "123", "admin");
console.log(newUser);

console.log(newUser.getProfile());

//? Blogs koleksiyonu, userId üzerinden Users koleksiyonuna referans veriyordu. Yani her blog yazısının, onu yazan bir sahibi (kullanıcısı) olmalı

//? Bunu OOP dünyasında Nesnelerin Birbiriyle Etkileşimi olarak adlandırırız. Farklı kalıplardan üretilmiş nesneler birbirlerinin içine girebilir ve birlikte çalışabilirler.

class Category {
  constructor(name) {
    this.name = name;
  }
}

const techCategory = new Category("World");

class Blog {
  constructor(title, content, author, categories) {
    this.title = title;
    this.author = author; //*yazar nesnesını tutacagım ozellık
    this.content = content;
    this.categories = categories;
    this.likes = [];
  }
  upDate(newTitle, newAuthor, NewContent) {
    this.title = newTitle;
    this.author = newAuthor;
    this.content = NewContent;
  }

  addLike(user) {
    return this.likes.push(user);
  }
}

const MyBlog = new Blog(
  "Deneme Baslık",
  "teknolojı ıle ılgılı",
  newUser,
  techCategory,
);
/* console.log(MyBlog); */

console.log(MyBlog);
console.log(MyBlog.title);
console.log(newUser.name);
console.log(MyBlog.author.name);

console.log(MyBlog.categories.name);

MyBlog.upDate("yeni baslik", { ...newUser, name: "DEniz" }, "yeni icerk");
console.log(MyBlog);

MyBlog.addLike({ ...newUser, name: "Deniz" });
console.log(MyBlog);

