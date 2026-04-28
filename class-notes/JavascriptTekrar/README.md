Gönderdiğin metin tam cümlenin ortasında ("but this is the g..." - muhtemelen "general approach" diyecekti) yarım kalmış. Ancak JavaScript dünyasının en meşhur, en kafa karıştırıcı ve mülakatlarda en çok sorulan konularından birine giriş yapmışsın.

Kod yazmamı istemediğini bildiğim için, işin sözdizimine (syntax) hiç girmeden V8 motorunun arka planda bu sayıları nasıl işlediğini ve neden bu krizlerin yaşandığını mantıksal olarak inceleyelim.
1. NaN (Not a Number) Paradoksu

Kitabın ilk değindiği nokta çok kritiktir: JavaScript'te NaN (Sayı Değil) değeri, kendisi de dahil olmak üzere evrendeki hiçbir şeye eşit değildir.

    Mantığı: Sistem sana "Bu işlemin sonucu bir sayı değil" der. Ama "Hangi sayı değil?" sorusunun cevabı belirsizdir. Bir harfi sayıyla çarpmak da NaN üretir, sıfırı sıfıra bölmek de. İki "belirsizlik" birbirine eşit olamayacağı için, NaN === NaN her zaman false döner. Bunu kontrol etmenin tek yolu Number.isNaN() aracıdır.

2. İkilik Sistemde Kesirlerin Çöküşü (0.1 Krizi)

Metindeki o sonsuz döngü krizinin sebebi bilgisayarların donanımsal doğasıdır.

    Sorun: Biz insanlar 10'luk tabanda düşünürüz. Bizim için 1/3 sayısı sonsuza kadar gider (0.33333...). Bilgisayarlar ise 2'lik (binary) tabanda düşünür. İkilik tabanda ise 0.1 değeri sonsuza kadar devreden bir sayıdır.

    Sonuç: V8 motoru (veya herhangi bir dilin derleyicisi) RAM'in sonsuz olmaması nedeniyle bu devreden sayıyı 64 bit sınırında bir yerde kesmek ve yuvarlamak zorundadır. Bu yüzden üç tane 0.1'i topladığında tam olarak 0.3 bulamazsın; sondaki o minicik yuvarlama hatası (0.30000000000000004) karşılaştırma mantığını yerle bir eder.

3. Kurtarıcı Tolerans: Number.EPSILON

Kitabın son kısmında bahsettiği bu değer, JavaScript'in "kabul edilebilir hata payı"dır.

    Çözüm: İki küsuratlı sayıyı doğrudan === ile kıyaslamak yerine, aralarındaki farkı (mutlak değer olarak) alırız. Eğer bu fark, Number.EPSILON dediğimiz o devasa küçüklükteki hata payından daha azsa, mimari olarak "Tamam, bu iki sayı aslında birbirine eşittir, sadece donanımsal yuvarlama farkı var" deriz.

💡 Mimari Bir Düşünce Sorusu (Pratik Vakti)

Geliştirdiğin projede kitap fiyatları (fiyat tablosu) var diyelim. Bir kitaba %15 indirim uyguladığında, arkada JavaScript'in bu küsurat (floating-point) hatasını yapma ihtimali çok yüksektir.

Sence finansal verilerle (fiyat, ceza tutarı, bakiye vb.) uğraşırken, JavaScript'in bu 0.1 yuvarlama krizlerinden tamamen kaçınmak için, veritabanına fiyatları ondalıklı (örneğin 15.50) kaydetmek yerine nasıl bir formatta (hangi matematiksel hileyle) kaydetmek en güvenli "Best Practice" (en iyi uygulama) olur? 🧐