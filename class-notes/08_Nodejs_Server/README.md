**# NODEJS MANTIGI :**

<details>
<summary>
İşlemci (CPU) ve bellek (RAM) inanılmaz hızlı çalışırken, diskten dosya okumak, ağdan veri çekmek veya kullanıcıdan girdi beklemek (I/O işlemleri) çok yavaştır. Geleneksel "Bloklayan" (Blocking) sistemler, bu yavaş işlemi beklerken o anki iş akışını tamamen durdurur.Bu noktada apache gıbı sunucular her istek için yanı her kullanıcı ıcın single thread olusturur onlem olarak.
Eğer çok popüler bir web uygulaması geliştiriyorsan ve sunucuna aynı anda 10.000 kişi bağlanırsa, sistemin her bir kullanıcı için ayrı bir thread oluşturmaya çalışması sence sunucu donanımında (bellek tüketimi, işlemci yorgunluğu vb.) ne gibi yönetimsel krizlere veya darboğazlara yol açar?

Bellek (RAM)	Her thread için işletim sistemi bellekte özel bir alan (stack) ayırır (genellikle 1-2 MB). 10.000 anlık bağlantı, sadece boşta bekleyen thread'ler için ~20 GB RAM'in tüketilmesi demektir.  Yanı ram de her ıstek ıcın yenı hafıza demek bu durum. 

Node.js, 10.000 bağlantı için 10.000 thread açmak yerine, her şeyi tek bir ana thread üzerinden yönetir.


Node.js mimarisinde "birbirini beklemeyen thread'ler" yoktur, çünkü JavaScript kodumuzu çalıştıran sadece tek bir ana thread(is parcacıgı) vardır. Birbirini beklemeyenler thread'ler değil, işlemlerin kendisidir (örneğin iki farklı ağ isteği veya dosya okuması).


🏭 Süreç (Process) vs. 🧵 İş Parçacığı (Thread)

Bir bilgisayar programını çalıştırdığında işletim sistemi bir Süreç (Process) başlatır.

    Süreç (Process): Bir fabrika binasıdır((nodejs gibi)). Kendi kaynakları (hammadde, elektrik, alan) vardır.

    İş Parçacığı (Thread): Bu fabrikanın içinde çalışan işçidir.


ANALIZ
1. Kapıdaki Nöbetçi: İşletim Sistemi ve Demultiplexer 🛡️

Senin axios isteğin backend sunucusunun kapısına (örneğin 3000. port) vurduğunda, onu karşılayan ilk şey Node.js değil, İşletim Sistemi (OS) çekirdeğidir.
Event Demultiplexer: Bu yapı Node.js'e ait değildir; işletim sisteminin bir parçasıdır (Linux'ta epoll, macOS'ta kqueue, Windows'ta IOCP).
Libuv: Node.js içindeki bu kütüphane, OS'in bu farklı demultiplexer yapılarını "sarmalar" ve Node.js'in anlayacağı ortak bir dile dönüştürür.

İşleyiş: OS, porta gelen veriyi izler. Veri geldiğinde Demultiplexer bunu bir "olay" (event) olarak işaretler ve "Veri hazır!" diyerek haberi Node.js'e gönderir.

Node.js'teki Durum Nedir? 🤔

Node.js uygulamanı başlattığında işletim sistemi tek bir process başlatır. Senin yazdığın JavaScript kodları ise bu sürecin içindeki tek bir ana thread üzerinde sırayla çalışır.(app.js dosyamız)

</summary>







```js
const fs = require("fs")
fs.writeFileSync("test.txt","hello")