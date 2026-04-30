

1. What is Express? (Express Nedir?)
🌐 Express, Node.js için geliştirilmiş hızlı, esnek ve minimal bir web framework'üdür (çatısıdır). Saf Node.js ile yüzlerce satır sürecek olan sunucu oluşturma ve yönlendirme (routing) işlemlerini birkaç satır kodla yapmamızı sağlar.

1. Where does the popularity of Express come from? (Popülerliği nereden geliyor?)
📈 Popülerliğinin ana sebepleri şunlardır:

    Minimalisttir: Sana katı kurallar dayatmaz (unopinionated), proje klasör yapını istediğin gibi kurabilirsin.

    Full-Stack JavaScript: Geliştiricilerin hem ön yüzü (frontend) hem de arka yüzü (backend) aynı dille (JavaScript) yazmasına olanak tanır.

    Topluluk: Devasa bir npm ekosistemine ve eklenti (middleware) desteğine sahiptir.

1. Which famous companies use Express, what is its place? (Hangi şirketler kullanır ve yeri nedir?)
🏢 IBM, Uber, Netflix ve X (Twitter) gibi dev şirketler mimarilerinde Express kullanır. Ayrıca sektördeki en popüler teknoloji yığınları olan MERN (MongoDB, Express, React, Node) ve MEAN stack'lerinin standart backend aracıdır.

1. What are the differences between Express and Node.js? (Express ve Node.js arasındaki farklar nelerdir?)
⚙️ Node.js bir JavaScript çalışma ortamıdır (runtime); kodların bilgisayarında/sunucunda çalışmasını sağlar. Express ise Node.js kullanılarak yazılmış bir kütüphanedir (araçtır).

    Analoji: Node.js arabanın gücü üreten motorudur. Express ise o motoru kolayca ve güvenli bir şekilde kontrol etmemizi sağlayan direksiyon ve vites sistemidir.


    "Otel Koridoru" örneğini hatırlıyor musun? Müşteri (istek/request) kapıdan girer ve en sondaki hedefine (rotaya/odaya) ulaşana kadar o koridorda ilerler. İşte bu koridorda bekleyen ve müşteriyi durdurup işlem yapan her bir görevliye Middleware diyoruz.


What is Middleware, and what are its functions?
Teknik olarak Middleware; gelen isteğe (req) ve gönderilecek cevaba (res) erişimi olan fonksiyonlardır. Üç temel işlevi vardır:

    📝 İşlem Yapmak: İsteği inceleyebilir veya değiştirebilir (örneğin kullanıcının giriş yapıp yapmadığını kontrol etmek).

    🛑 Süreci Sonlandırmak: Eğer bir sorun varsa (örneğin hatalı veri), alt odalara inmeden doğrudan cevabı (res.send) dönüp müşteriyi otelden gönderebilir.

    ✅ İzin Vermek: Her şey yolundaysa, elindeki telsizi (next()) kullanarak müşterinin bir sonraki görevliye veya odaya geçmesine izin verir.





 6. Explain what the keys we see in the package.json file mean. (package.json içindeki anahtarlar ne anlama gelir?)
📦 package.json dosyasını projenin "Kimlik Kartı ve Tarif Defteri" olarak düşünebilirsin. En önemli anahtarlar şunlardır:

    name & version: Projenin adı ve sürümü.

    scripts: Terminalde çalıştıracağımız kısayol komutlarıdır (örneğin projeyi başlatmak için start komutu yazmak).

    dependencies: Projenin çalışması için zorunlu olan dış kütüphaneler (örn: express, sequelize).

    devDependencies: Sadece geliştirme aşamasında bize yardım eden, canlıda (production) gerekmeyen araçlar (örn: kodu her kaydettiğinde sunucuyu yeniden başlatan nodemon).



7. What is the difference between res.send() and res.json() in Express.js? (Farkları nelerdir?)
   
💬 İkisi de müşteriye cevap gönderir ama aralarında ince bir fark vardır. Hatırlarsan az önceki toplama işlemi pratiğinde res.send(15) yazdığımızda Express bunu 15 numaralı bir HTTP durum kodu sanmıştı!

    res.send(): İçine koyduğun veriye bakar ve tipini tahmin etmeye çalışır. Esnektir ama sayı gönderirken kafası karışabilir.

    res.json(): Gelen veriyi zorla ve güvenli bir şekilde standart JSON formatına çevirir. Bir backend API yazarken cevapları res.json() ile dönmek en güvenilir yoldur.


8.What is the difference between app.use() and app.get() in Express.js? (Farkları nelerdir?)
🚪 İkisi de oteldeki görevlilerdir ama yetki alanları farklıdır:

    app.get('/profil', ...): Sadece ve sadece GET yöntemiyle ve tam olarak /profil odasına gelen müşterilere bakar. Çok kuralcı ve spesifiktir.

    app.use(...): İsteğin türü (GET, POST, PUT) veya nereye gittiği pek umrunda değildir. Bütün trafiğin aktığı ana koridordur.