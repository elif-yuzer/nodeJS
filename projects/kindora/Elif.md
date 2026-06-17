# YAPILACAKLAR
Sayfa navbarında dil ekleme checkbox ı olmalı ing, turk, a

## AKIS SIRASI BU SEKILDE MI OLMALI  ?


1. Auth (register, login, logout, refresh, rol değişimi)
2. OrganizerRequest (talep oluştur, admin onayla/reddet)
3. Events (oluştur, listele, detay)
4. Activities
5. Forums + Comments




  ### Kullanıcı organizator olarak basvuru yapınca 

  1. role degısmeyecek
  2. gonderdıgı talep admin panele dusecek (admin onaylar ya da reddeder)
  3. admin onaylarsa role degıssın refresh token sılınsın sonra guncel rol ıle gırıs yapsın


simdı bu kurgu için yeni bir model mı olusturulmalı yoksa user tablosuna mı eklenmelı ?

* admin neden kabul etmedıgını acıklar .Sonrası yıne aynı organızator tekrar talep acabilir mi ?
projede 3 kısıyız ve herbirimiz admin olucaz panelde ve gelen organizator onayında ya da reject olayında hangı admın yaptı bunu da db de tutmak gerekır.

* user tablosuna eklersek bu kısmı endpoint ıstegı gelınce tum userları tarayıp sonrasında bulup getirip statusu : pendıng gibi bir degerde olan tum kayıtları taramak gerekır ama ayrı bır status ıcın tablo olusturulursa sankı zaten sadece burda tararız statu durumunu . Yani organizatore requesteleri adında model acarsak orda tarar statusu pendıng olanları
Simdi organızatorum ben basvurdm pendıng de farklı bılgılerle bır talep daha olusturabilirm ama aynı bılgılerle pendıng de bekleyen bır kaydı tekrar gonderemem.burda bır kontrol mekanızması olacak

* oranızator kayıt olunca zaten enstitu bılgıse role onayıyla beraber db ye kayıt olacak user ıle ref oluck
mesela bir enstituye ait ıkı farklı kısı kayıt oldu dıyelım aynı ısım ıle bacekende ıstek atabılır mı

* admin 


### admin role nunun yaptıgı seyler : 
1.userları sılme update,delete vs olaylarını gerceklestırme.Backend ısmı ıcın admının route ları farklı olacak sadece 
```js
router.use("/admin/oranizator-requests", organızator-requests)
router.use("/admin/users", userroute)
router.use("/admin/events", eventroute)
```
2.Admin panel frontende ıkı yaklasım olacak buna karar verilmesi lazım.Ama sanırım bız aynı frontend farklı route kullanıcaz

**********************
 meetup sitesi ornek sıte
### event kısmı 

bireysel de olsa mesela bir kullanıcı bir evente katılma isteği gonderdi bu istek eventi olusturan kısıye mi gitmeli organizatorse organizatorun onayına gıdecek facebook takı event mantıgı gıbı mı olacak.Kapasite dolmamıssa istek dgidecek kapasite dolmussa istek gecersiz olack
ucret konusu ıcın stripe zor gelırse muadili mollie bakılır

konum olayı mongodbgeojson mongodbye yerlesık gelıyor paket kurulumuna gerek yok


Cloudinary  → en kolay, ücretsiz tier var, direkt Node entegrasyonu

email verification da deploy sırasında servis uyumsuzlugu onemlı olabilir buna gore deploy ortami ve ona uygun servis secmek gerekebilir
Nodemailer + Gmail SMTP  → ücretsiz, kolay kurulum
Resend                   → modern, ücretsiz tier, daha güvenilir

Register → emailVerificationToken üretilir → mail gönderilir
Kullanıcı linke tıklar → isEmailVerified: true olur

Şifre reset → resetPasswordToken + resetPasswordExpire → mail
Kullanıcı yeni şifre girer → token silinir


SendGrid (Twilio) — en yaygın, geniş free tier (aylık 100 mail), iyi analytics/webhook desteği
Amazon SES — AWS ekosistemindeyse maliyet açısından çok ucuz (1000 mail ≈ $0.10), ama deliverability/analytics araçları daha az
Mailgun — geliştirici dostu API, transactional + marketing email karışımı projelerde tercih edilir
Postmark — özellikle transactional mail (şifre sıfırlama, doğrulama, fatura) için optimize, çok yüksek deliverability, ama marketing maili göndermene izin vermez (politika olarak)
Resend — son dönemde popülerleşen, geliştirici deneyimi odaklı, modern API


## ACTIVITY KISMI :
PSUEDO
1.Yas tespiti olacak: req gelen kullanıcıyı bul dogdugu yıla gore yasına bak Sonra karar matrisi mantıgına gore de uygun activiteleri getir
mantıgı bu olmalı mesela Aktivitenin hitap ettiği minimum yaş (min), 5'e küçük veya eşit (lte) olmalı. VE

Aktivitenin hitap ettiği maksimum yaş (max), 5'e büyük veya eşit (gte) olmalı. db de sorgulama sayesinde bu sekılde gonderilme saglanır memory sisirilmeden
Diyelim bir yas grubuna ait 1000 tane veri cıktı bunun hepsi gitmez bunu limit mantıgında parcalara ayırarak gondericm pagination.mesela ama frontendde ikinci sayfasyı istedi diyelim kullanıcı ne oluck ? Burda da limit ve skip kullanarak veriler atlanarak gitmeli 
atlanacak olan veri= istenen sayfa sayısı * limit ne bırakılmısa
blog appte bu verilerin gelme sekli details kısmında saklıydı bu mantıga gore detailse bakarak db nin mantıgına gore işlem yapmıstm


benım gorevim


ADMIN PANEL :

1. Constant klasorunde admin rolerini atadım bir nevi motor adminin sozlugu
2. roles:eum tanımları ıcın yıne constant sayfasında enumslar ıcın bır fıle acılabılır.  cunku sımdıye kadar user alanında bir enum actık : user tiplerini kategorize ettik.
3. organizator ısteklerı ıcın ben olusturmaya calıstım:pendıng,reject ,approved
4. sıkayet ıcın olabilir sıkayet olayı da mesela bır kullanıcı tum sıtede ıstedıgı herhangı bır yerı sıkayet edebilir .mesela atıyrom forumda cınsıyetcı bır konu baslıgı onu rahatsız etmıs olabılır dırekt tıtle i şikayet edebilir , kullancı yorumunu sıkayet edebilir, activite için mesela admin onaylamıs olsa bile atıyorum kişi o alanda uzmandır uygun gormedıgı ıcınmı sıkayet edecek gibi burda da bir enum yapısına ihtiyac olabilir.Burda sadece kafamı karıstırıan her bir olayı bu sekılde dusunup db yı yormamak sısırmemek adına ref baglı semalar olusturursak eger atlas bıze ne kadar sınır tanıyor tum projemız ıcın
5. cunku forum kısmı ıcın mesela bir kullanıcı bir kullanıcıyı sıkayet etti diyelim bu sıkayetın admine ulasması ıcın bir semaya ihtiyacı var gibi (hangi kullanıcı hangı kullanıcıyı sıkayet etti,şikayet nedeni ,şikayetin durumu , pending dismissed reviewed bir de admin ne zaman baktı).dusunuyrum bu ucumuzun projesi olacak ve ilerleyen donemlerde geliştirirsek buraları boyle kurguladıgımızda sıstemde uc admın tanımlamak ve hangı adminin ne yaptıgını bilmek anlamında temel olusturabilir
6. 





5. admin için middleware yaptım ,
6. controller tanımladım ayrı bir ednpoint tanımladım.
7. roles kısmını constant klasorunde tanımladım ,genelde constant adı altında tutulur bu tarz fıle lar.
8. adminin user uzerindeki crud yetkilerini kontrol edicm list tamamdir
9.  organizatorun statulerini gorebilmesi için organizator-request diye bir tablo tutmam lazım admın ne zaman işledi formu aprrove mu reject mı yaptı yaptıysa rejectin sebebini kullanıcıya gondermeli
