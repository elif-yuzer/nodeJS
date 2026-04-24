const express=require('express')

const app=express()


//**Veriyi Yakalama ve Çevirme (Body Parsing)
// ?Express.js: Sadece app.use(express.json()); yazdın.Ham Node.js: Gelen baytları toplamak için parseRequestBody adında devasa bir fonksiyon yazdın. req.on("data") ile parçaları birleştirdin, req.on("end") ile try/catch içine alıp JSON.parse(body) yaptın.Kitap Bağlantısı: Bu tam olarak kitabın bahsettiği Middleware (Ara Yazılım) desenidir. Express, HTTP isteği fabrikadan içeri girer girmez bu görevliyi (middleware) çalıştırır. Görevli, senin o uzun Node.js kodunun aynısını kendi içinde çalıştırır, veriyi JSON objesine çevirir ve sonraki adımlarda kullanabilmen için req.body içine yerleştirip next() ile bandı ilerletir */
app.use(express.json())


require('dotenv').config();
const PORT = process.env.PORT || 3000;


const urunler = [
  { id: 1, isim: 'Laptop', fiyat: 15000, kategori: 'elektronik' },
  { id: 2, isim: 'Telefon', fiyat: 8000, kategori: 'elektronik' },
  { id: 3, isim: 'Masa', fiyat: 3000, kategori: 'mobilya' },
  { id: 4, isim: 'Sandalye', fiyat: 500, kategori: 'mobilya' },
];




//**Yönlendirme (Routing / Demultiplexer)Express.js:
// ? Express.js: app.get('/urunler', ...) ve app.post('/urunler', ...) metotlarını kullandınKitap Bağlantısı: Express, arka planda bir "Rota Listesi" (Router Stack) tutar. Sen app.get dediğinde, bu listeye yeni bir kural ekler. İstek geldiğinde, Express senin yazdığın o karmaşık if/else koşullarını arka planda sırayla kendi test eder. Eşleşme bulduğunda, paketi o rotanın fonksiyonuna (handler) teslim eder.*/



//* Tüm ürünler getir
app.get('/urunler', (req, res) => {
  res.json(urunler);
});



//**3. Adım: Dinamik Parametreleri AyıklamaHam Node.js:
// ? Bir kullanıcının ID'sini almak için Regex kullandın: req.url.match(/^\/users\/(\d+)$/). Ardından bu değeri URL'den kesip biçerek çıkardın: Number(req.url.split("/")[2]).Express.js: Sadece /urunler/:id yazdın.Arka Plan: Express.js'in yönlendirme motoru, URL'deki : (iki nokta üst üste) işaretini gördüğünde arka planda senin ham Node.js'te yazdığın o Regex mantığını otomatik olarak oluşturur. Gelen değeri de req.params.id kutusunun içine koyar. */
app.get('/urunler/:id', (req, res) => {
  console.log('Params: ', req.params);
  const id = Number(req.params.id); //! Gelen değer string olacaktır
  const urun = urunler.find(u => u.id === id);

  if (!urun) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }



  //**4. Adım: Yanıt Gönderme ve Akışı Kapatma
  // ?Ham Node.js: Başlıkları ayarladın res.writeHead(200), veriyi metne çevirdin JSON.stringify(user) ve bağlantıyı kapattın res.end()Express.js: Sadece res.json(urun) yazdın.Arka Plan: Express'in res.json() fonksiyonu aslında senin res.writeHead, JSON.stringify ve res.end işlemlerini tek bir satırda toplayan akıllı bir sarmalayıcıdır (wrapper). Content-Type başlığını otomatik olarak application/json yapar ve Time-out (sonsuz bekleme) olmaması için işlemi güvenle sonlandırır. */
  res.json(urun);
});

//* Birden fazla param kullanımı

app.get('/urunler/:kategori/:id', (req, res) => {
  console.log('Params: ', req.params);

  res.json(req.params);
});


//! REGEX kullanımı

//Sadece rakam kabul eden param

app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!/^\d+$/.test(userId)) {
    return res.status(400).json({ hata: 'id sayı olmak zorunda' });
  }
  res.json({ userId });
});


// Başlayanlar

app.get(/^\/profile/, (req, res) => {
  res.json({ mesaj: 'profile ile başlayanlar' });
});


// Bitenler

app.get(/list$/, (req, res) => {
  res.json({ mesaj: 'list ile bitenler' });
});

// Filtreleme

app.get('/ara', (req, res) => {
  console.log('Query:', req.query);
  let sonuc = [...urunler];

  // kategori filtresi
  if (req.query.kategori) {
    sonuc = sonuc.filter(u => u.kategori === req.query.kategori);
  }

  // Fiyat filtresi
  if (req.query.maxFiyat) {
    sonuc = sonuc.filter(u => u.fiyat <= Number(req.query.maxFiyat)); //! query string döndürecektir sayı amaçlı kullanım için döndürmek gerekir
  }
  res.json(sonuc);
});

// Yeni Ürün Ekleme POST
app.post('/urunler', (req, res) => {
  console.log('body:', req.body);
  const { isim, fiyat, kategori } = req.body;

  //basit validasyon
  if (!isim || !fiyat || !kategori) {
    return res.status(400).json({ hata: 'Eksik bilgi' });
  }

  const yeniUrun = {
    id: urunler.length + 1,
    isim,
    fiyat,
    kategori,
  };
  urunler.push(yeniUrun);
  res.status(201).json({ mesaj: 'Ürün eklendi', urun: yeniUrun });
});

// Bilgi güncelleme PUT

app.put('/urunler/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const index = urunler.findIndex(u => u.id === id);

  //validansyon
  if (index === -1) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }

  urunler[index] = { ...urunler[index], ...req.body };

  res.json({ mesaj: 'Ürün güncellendi', urun: urunler[index] });
});

// Ürün silme DELETE

app.delete('/urunler/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const index = urunler.findIndex(u => u.id === id);

  //validansyon
  if (index === -1) {
    return res.status(404).json({ hata: 'Ürün bulunamadı' });
  }

  const silinenUrun = urunler.splice(index, 1);

  res.json({ mesaj: 'Ürün silindi', urun: silinenUrun[0] });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

/* 
Hatırlarsan 404 (Hata) yakalayıcısını kodun en sonuna koymuştuk. Peki ya yanlışlıkla sırayı karıştırıp, 404 görevlisini bantta /books rotasından hemen önceye koysaydık ne olurdu?

Kullanıcı Postman'den doğru bir şekilde GET /books isteği attığında, sence bu paket booksRouter görevlisine ulaşabilir miydi, yoksa sistem daha o aşamaya gelmeden 404 hatası mı fırlatırdı? 🧐
Güzel bir yaklaşım ama hayır, JSON içerisine (veya express.json() içine) yazmıyoruz. 😊

Fabrikadaki "Montaj Hattı" (Pipeline) analojimizi tekrar düşünelim:

Paket (istek) fabrikaya üstten girer ve aşağıya doğru sırayla ilerler:

    Önce app.use(express.json()) görevlisi paketi açar.

    Sonra app.use('/books', booksRouter) görevlisi bakar. "Bu benim işim mi? Hayır, bu paket /yazarlar adresine gelmiş" der ve paketi bantta aşağıya bırakır.

    Paket bantta ilerlemeye devam eder...

Eğer paket bandın en sonuna kadar ulaştıysa ve hiçbir görevli (rota) bu paketi sahiplenmediyse, bu paketin gideceği bir yer yok demektir (İşte bu 404 hatasıdır).

Bu yüzden 404 "Kaçış/Hata" görevlisini, ana fabrikanın (server.js) en altına, yani tüm rotaların bittiği yere, ama şalteri indirmeden (app.listen) hemen önceye koymalıyız.

Kodda tam olarak şöyle görünür:

Peki sana kritik bir mimari soru:

Sence bu 404 middleware'ini yanlışlıkla app.use('/books', booksRouter); satırının hemen üstüne yazsaydık ne olurdu? Bir kullanıcı Postman'den /books adresine istek attığında fabrikada neler yaşanırdı? 🧐 */