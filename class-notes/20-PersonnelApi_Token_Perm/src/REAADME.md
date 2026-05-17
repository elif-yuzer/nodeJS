1. Kullanıcı login olur (userName + password gönderir)
        ↓
2. Sunucu doğrular → Token üretir → DB'ye kaydeder
        ↓
3. Token'ı kullanıcıya gönderir
        ↓
4. Kullanıcı her istekte token'ı header'da gönderir
        ↓
5. Sunucu token'ı DB'de arar → geçerliyse isteği kabul eder
6. 
7. ****

Kullanıcı istek atar → authMiddleware çalışır:
  1. header'dan token alır
  2. DB'de Token koleksiyonunda arar
  3. bulursa → o token'ın userId'siyle Personel'i çeker
  4. req.user = bulunan personel
  5. next() → controller çalışır
1. ***
2. 
3. Yani req.user her seferinde DB'den geliyor — kullanıcının gönderdiği veriye güvenilmiyor.

***

# 🧠 Backend Düşünce Mantram

> Kod yazmadan önce zihinde doğru canlandır.

---

## 📝 1. Önce Sözde Kod Yaz
- Editörü açma. Önce düz yazıyla tüm kuralları sırala.
- "Giriş yoksa kapat. Admin ise izin ver. Lider ise departman + silme izni true olmalı."
- Kurallar kağıtta netleşince `&&` / `||` kendiliğinden yerine oturur.

## 🔍 2. Veriyi Takip Et
- Her request'te `req.user`, `req.params.id` içinde tam olarak ne var?
- Her değişkeni bir **kutu** gibi düşün: kutunun içi her satırda ne oldu?
- Veri tipini de kontrol et: String mi, Object mi, undefined mı?

## 🔄 3. Kademeli İnşa Et
- Tüm kuralları aynı anda yazma.
- Önce **en temel kural** → test et → yeşil ışık → bir sonraki katmanı ekle.
- Sıra: Giriş kontrolü → Admin kontrolü → Departman / İzin kontrolü.

---

> 💡 **Kural:** Kafan karışırsa adım adım geri dön.  
> Karmaşık problemler küçük parçaların toplamıdır.