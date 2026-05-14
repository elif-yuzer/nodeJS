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