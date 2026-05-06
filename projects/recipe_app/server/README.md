# Recipe App — Server (Backend)

This README documents the backend (server/) — how to run it, configured entrypoint, installed packages, and core modules.

## Quick start
1. Install dependencies:

   npm install

2. Create a `.env` in the server folder (example below).
3. Start development server:

   npm run dev

## Entry point & scripts
- Entry point used in development: src/app.ts
- package.json scripts (already configured):
  - dev: ts-node-dev --respawn --transpile-only src/app.ts
  - build: tsc
  - start: node dist/index.js

## Environment variables (.env example)
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://user:pass@host:27017/dbname
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000

## What the code contains
- src/app.ts — app setup, middleware wiring, and server start. It calls src/config/db.ts to connect to MongoDB before listening.
- src/config/db.ts — connects to MongoDB using process.env.MONGODB_URI. If missing, the app exits with an error.
- src/middlewares/errorHandler.ts — centralized error handler that returns JSON errors and hides stack traces unless NODE_ENV=development.
- src/services/authService.ts — registers users: checks existing email, hashes password with bcrypt, creates User.
- src/controllers/recipeController.ts — sample controller: getAllRecipe returns all recipes.
- src/controllers/userController.ts — currently empty; expected to hold user-related endpoints.
- src/models/\* — Mongoose models included:
  - User (users.ts): name, email (unique), password, image, role
  - Recipe (recipe.ts): title, preparation, media, publish flag, userId, categoryId, likes
  - Category (categories.ts): name

## Installed packages and their aims
### Runtime dependencies (from package.json)
- express — web framework for routes and middleware
- mongoose — MongoDB ODM used for models and DB access
- dotenv — loads .env into process.env for local development
- cors — CORS middleware
- bcrypt — password hashing for auth

### Dev dependencies
- typescript, ts-node-dev, @types/* — TypeScript and type definitions for development and hot reload

## Recommended config notes
- Ensure MONGODB_URI is set before starting. src/app.ts currently calls connectDB() and exits on failure.
- Keep db connection logic in src/config/db.ts simple: it connects once on startup. If you prefer per-request checks, add a small middleware to ensure connection without reconnecting on each request.
- Implement routes and register them in src/app.ts (currently routes are not wired).

## How to run in production
1. npm run build
2. Ensure environment variables are provided (MONGODB_URI, JWT_SECRET,...)
3. npm run start

## Next steps
- Implement userController and register routes in app.ts
- Add request validation and authentication middleware
- Add database seed/migration scripts if needed

---

Updated README to reflect current project files and dependencies.


Şimdi ilk olarak projemi yaparken klasör ve dosya konfigürasyonu yaptıktan sonra .env dosyama database'imin bilgilerini ve port bilgilerimi tanımladım. Bu port bilgilerini tanımladıktan sonra geldim dedim ki; db.ts adında bir konfigürasyon dosyası yaptım. Burada Mongoose kullandığım için Mongoose'u import ettim.

Sonra dedim ki dotenv bana lazım, çünkü dotenv paketi gidip .env dosyasının içerisindeki bilgileri okuması gerekiyor. Bunu neyle yapıyor? config ile yapıyor. dotenv.config dedikten sonra, URI'ımı process.env ile okuyabiliyorum ve uygulamada çağırabiliyorum. URI'ımı bu şekilde alıp URI adında bir değişkenin içerisine attım.

Sonra bir fonksiyon yazdım. Bu fonksiyon ne yaptı? Fonksiyonun adına connectDB dedim. Bu fonksiyon database'e bağlandığı için async/await yapısında olması, yani asenkron çalışma mantığına sahip olması gerekiyor. Burada async/await yapısının içerisinde bir try-catch yapısı kullandım. Neden? Çünkü URI'ımda bir hata olabilir, .env dosyası boş olabilir veya okunmamış olabilir. Bütün bu hataları almak adına ilk önce bir if koşuluyla "URI'ım var mı, yok mu?" diye kontrol ettim. Eğer bir URI yoksa, "MongoDB'nin URI'ı not set" yani .env dosyasında bir hata var mesajını fırlat dedim.

Eğer bu if koşulunu atlarsa, bir hata yoksa, .env dosyam temizse ve URI'ım geçerliyse; bekle diyorum. Mongoose URI'ıma bağlanana kadar bekle. Eğer o bağlantı kurulduğu an bana "is connected" diye bir console.log at, ben bunu bir test ettim. Sonra dedim ki, eğer bu try bloğundan sonra bir hata olursa catch ile ben bunu yakalayacağım. Buradaki catch içindeki error aslında JavaScript kütüphanesinin kendi metodu olan bir error. O yüzden console.log ile "database içerisinde nasıl bir error varsa onu yakala" dedim. Eğer bir hata varsa ve bağlantı yoksa, uygulamayı durdurmak adına process.exit(1) ile süreci sonlandırdım. Database konfigürasyon dosyasını böyle yaptım.

Sonrasında bu adımı gerçekleştirdikten sonra app dosyasına geldim. App dosyasında dedim ki, burası önemli; app dosyası demek aslında bir server yaratıyorsun demektir. Bu server aslında arka planda kocaman bir callback fonksiyonuyla request'leri (istekleri) alan, aynı anda 100 kullanıcı varsa 100 tane request alan bir yapıya sahip. Bunun için burada önemli bir nokta var. İlk önce bizim dotenv ve dotenv.config'i import etmemiz gerekiyor, Express framework'ünü dahil etmem gerekiyor, database connection bilgilerimi import etmem gerekiyor. Bu şekilde bir import sırası gerçekleştirdim.

Önceden biz http.createServer diye upuzun bir fonksiyon açıp bütün işlemleri manuel olarak kodlarla, pure Node.js'te kendimiz yapıyorduk. Ama Express bunu app adı altında bana sağlıyor. app, Express'in bir metodu. Yani benim aslında pure Node.js'te yazmış olduğum o application kısmı.

Sonra diyorum ki, burada app dosyası önemli. App dosyasında middleware'ler olur. İlk önce şu olması lazım: Gelen request buffer şeklinde, sonuçta baytlar halinde geliyor. app.use(express.json()) ile o arkadaki parser, yani body-parser dediğimiz helper fonksiyonunun yaptığı uzun işi kısaltarak, JSON formatında string şeklinde request'i alıyoruz. Ben bu request'i kullanıcıdan, REST Client üzerinden bir register request'i olarak aldım. Kullanıcı register olmak istiyor ve bilgilerini bana attı.

Middleware'ler ara katmanlardır. Router'lar ve controller'lar arasında işlem yapan güvenlik elemanı gibi aslında. Sonra route'larım var. Ben burada /api/users adında bir URL oluşturdum. Bu URL'e de router aracılığıyla yolumu belirledim. app.use ne demek? "Senin içinde bir router var, git o router bileşenine bak. Kullanıcı ne yapmak istemiş? Oraya bak."

Şimdi gidelim authRoutes dosyasına. Ben burada export const router = express.Router() diyerek Express'in router modülüyle routing işlemlerimi yapacağımı belirttim. Burada diyorum ki; router.post("/") kök dizininde bir "post user" işlemi yapılacak. Bu işlemi yapan bileşenim kim? User controller'ım, yani benim garsonum. Ne oldu? REST Client bana isteği attı mı? Attı. Router ile ben bunu aldım mı? Aldım.

Bir postUser işlemi var. Burada diyorum ki, controller dediğim şey request, response ve bir de içerisinde middleware gibi çalışan next parametrelerini alıyor. Sonra içerisinde bir try-catch yapısı kurdum. Diyorum ki, req.body ile gelen bilgiyi, datayı sen destructuring yap. firstName, lastName, email, password, role. Bu garson (userController dediğim şey), "Siparişimi aldı, gelen paketim bunlar" dedi. Bu bilgileri alıp userInfo fonksiyonuna (Aşçıya) attı ve await ile bekledi.

Burada veritabanı işlemi olduğu için asenkron bir yapı kullandım. Destructuring ettiğim bu bilgileri aşçıya ilettim. Eğer bu userInfo'dan dönen bilgiler tamamsa, statüsü 201 olan ve datası oluşan bir create işlemi yapmış olacağım.

Buradaki userInfo (Service) dediğimiz şey zaten gelen bilgileri alıyor, veritabanı ile iletişime geçiyor. İlk önce bir kontrol yapıyor: "Bu email adında bir kayıt var mı?" Varsa bana "Bu kullanıcı zaten var" diye bir hata fırlatıyor. Eğer yoksa, bu kullanıcının şifresini alıyor, bir hashliyor (şifreliyor). Sonrasında bunu newUser adıyla veritabanına create edip kaydediyor. Sonra da bu datayı geri döndürüyor. Bu fonksiyon serviste işlemini bitirip döndürdüğünde, Controller katmanında işlem başarılı bir şekilde sonuçlanmış ve kullanıcı yaratılmış oluyor.

### JWT TOKEN KONUSU
Harika bir tercih! Authentication (Kimlik Doğrulama) ve Authorization (Yetkilendirme) konuları modern web geliştirmenin kalbidir.

Hemen npm paketi sorunun cevabını vereyim: Evet, bu iş için dünya standartlarında kullanılan ve projene eklemen gereken paket jsonwebtoken paketidir. (TypeScript kullandığın için tiplerini tanıması adına @types/jsonwebtoken paketini de geliştirici ortamına eklemen gerekecek).


Hemen npm paketi sorunun cevabını vereyim: Evet, bu iş için dünya standartlarında kullanılan ve projene eklemen gereken paket jsonwebtoken paketidir. (TypeScript kullandığın için tiplerini tanıması adına @types/jsonwebtoken paketini de geliştirici ortamına eklemen gerekecek).
JWT (JSON Web Token) Mantığı Nedir?

Restoran benzetmemize harika bir güncelleme getirelim. JWT, lüks bir restorandaki VIP Bileklik / Yaka Kartı sistemidir.

    Giriş (Login - Authentication): Müşteri kapıya gelir, kimliğini (e-posta) ve parolasını (şifre) gösterir. Aşçı kilerdeki kayıtlara bakar. "Evet, bu şifre doğru, kişi bizden" der.

    Bileklik Takılması (Token Üretimi): Aşçı, Müşteriye bir VIP bileklik takar. Bu bilekliğin üzerinde müşterinin sipariş numarası (Veritabanı ID'si) ve yetkisi (örneğin sadece "user" mı yoksa "admin" mi olduğu) yazar.

    Rahatça Dolaşma (Authorization): Müşteri artık restoranda içki sipariş ederken veya özel odalara girerken tekrar kimlik veya şifre göstermez! Sadece kolundaki o bilekliği (JWT) gösterir.

Bu sistemin en büyük avantajı "Stateless" (Durumsuz) olmasıdır. Yani Güvenlik Görevlisinin her siparişte koşup kilerdeki deftere (veritabanına) bakmasına gerek kalmaz. Bilekliğin (Token) kendi içindeki dijital mühür, o kişinin kim olduğunu zaten tek başına kanıtlar! Sunucuyu hiç yormaz.