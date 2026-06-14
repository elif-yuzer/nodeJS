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


simdı bu kurgu için yeni bir model mı olusturulmalı yoksa user tablosuna mı eklenmelı sanki

* admin neden kabul etmedıgını acıklar .Sonrası yıne aynı organızator tekrar talep acabilir mi ?
projede 3 kısıyız ve herbirimiz admin olucaz panelde ve gelen organizator onayında ya da reject olayında hangı admın yaptı bunu da db de tutmak gerekır.

* user tablosuna eklersek bu kısmı endpoint ıstegı gelınce tum userları tarayıp sonrasında bulup getirip statusu : pendıng gibi bir degerde olan tum kayıtları taramak gerekır ama ayrı bır status ıcın tablo olusturulursa sankı zaten sadece burda tararız statu durumunu .
Simdi organızatorum ben basvurdm pendıng de farklı bılgılerle bır talep daha olusturabilirm ama aynı bılgılerle pendıng de bekleyen bır kaydı tekrar gonderemem.

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
 meetup sitesi
### event kısmı 

bireysel de olsa mesela bir kullanıcı bir evente katılma isteği gonderdi bu istek eventi olusturan kısıye mi gitmeli organizatorse organizatorun onayına gıdecek facebook takı event mantıgı gıbı mı olacak.Kapasite dolmamıssa istek dgidecek kapasite dolmussa istek gecersiz olack
ucret konusu ıcın stripe zor gelırse muadili mollie bakılır

konum olayı mongodbgeojson mongodbye yerlesık gelıyor paket kurulumuna gerek yok


Cloudinary  → en kolay, ücretsiz tier var, direkt Node entegrasyonu


Nodemailer + Gmail SMTP  → ücretsiz, kolay kurulum
Resend                   → modern, ücretsiz tier, daha güvenilir

Register → emailVerificationToken üretilir → mail gönderilir
Kullanıcı linke tıklar → isEmailVerified: true olur

Şifre reset → resetPasswordToken + resetPasswordExpire → mail
Kullanıcı yeni şifre girer → token silinir






