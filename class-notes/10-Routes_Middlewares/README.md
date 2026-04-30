Express.js’te middleware (ara yazılım), bir isteğin (request) sunucuya ulaştığı an ile yanıtın (response) gönderildiği an arasında çalışan fonksiyonlar zinciridir.
Kodu Yürütmek: Herhangi bir mantığı (loglama, veritabanı kontrolü vb.) çalıştırabilir.

İstek ve Yanıt Nesnelerini Değiştirmek: req veya res nesnelerine yeni özellikler ekleyebilir. (Örn: req.user gibi).

Döngüyü Sonlandırmak: Eğer bir hata veya yetkisiz erişim varsa, res.json() diyerek isteği asıl rotaya ulaşmadan bitirebilir.

Bir Sonraki Durağa Çağırmak: İşini bitirdiğinde next() fonksiyonu ile bayrağı bir sonraki middleware'e devreder.

2. Senin Kodundaki Somut Örneği: express.json() 🛠️

Kodunun en başında yer alan app.use(express.json()); satırı, Express'in en kritik "Built-in" (Yerleşik) middleware'idir.Görevi: Ham HTTP isteğiyle gelen "bit" yığınlarını yakalar, onları birleştirir ve senin için bir JavaScript objesine dönüştürür.

ğer bir middleware next() demezse ve res.send() ile yanıt da dönmezse, o istek havada asılı kalır (tarayıcı sonsuza dek döner).

Mantık şu: middleware bir güvenlik kapısı gibi çalışır.
Express’te request geldiğinde sırayla fonksiyonlardan geçer. Her middleware’in görevi iki seçenekten biridir:

Geçir → next()
Durdur ve cevap ver → res...

Üçüncü seçenek yok gibi düşünebilirsin.

Bir AVM kapısında güvenlik var.

Müşteri geldi.

Güvenlik bakıyor:

Yetkiliyse → içeri alır (next())
Yetkisizse → içeri almaz, açıklama yapar (res.status(...).json(...))

const isAdmin = (req, res, next) => {
   const role = "User";

   if(role === "Admin"){
      next();
   } else {
      res.status(403).json({
         message: "Yetkiniz yok"
      });
   }
}
Request geldi:

/admin-panel

Middleware çalıştı.

Eğer Admin ise
next()

Bu şu demek:

Sıradaki middleware’e / route’a geç.

Yani kapı açıldı.

Eğer Admin değilse
res.status(403).json(...)

Bu şu demek:

Burada işlemi bitiriyorum, kullanıcıya cevap dönüyorum.

Yani kapı kapan

🔥 Neden next() Çağırmıyoruz?

Çünkü next() dersen kullanıcı içeri girer.

Admin olmayan birini admin paneline sokmuş olursun.

🔥 Neden Sonsuz Loading Oluyor?

Eğer şunu yaparsan:

send(...)