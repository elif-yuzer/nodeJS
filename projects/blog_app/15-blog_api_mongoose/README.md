npm i dotenv express mongoose
1.db conncetion ıslemını yap
2.dbconncetion sayfasında bır baglantı fonk olustur ve app te cagır server ayarları yapıldıktan sonra
3.$ nodemon -v
3.1.14

ELIF@ELIFSPC MINGW64 ~/Documents/Working/nodeJS/projects/blog_app/blog_api_mongoose/src/config (main)
$ which nodemon  git bas :where nodemon
/c/Users/ELIF/AppData/Roaming/npm/nodemon
linux komutu : mkdir -p  klasoradi && touch kalsoradi/dosyadı 

app dosyasında
1.dotenv config
2.express import 
3.db config dosyası import(promise konusu)
4.erorhandler import
5.router import
6.const app tanımı

process.exit(0)  // programı BAŞARIYLA kapat
process.exit(1)  // programı HATA ile kapat(Örneğin Docker, PM2, sunucu gibi araçlar
// bu kodu izler)

burda ogrendiğim olar app.all(route hataası ıcın ozel bir statuscodunu res ekledik typscripte bu olay boyle deil.)

sema olusturdm 
mongoose=requiredann import sonra sema ollustur = new mongoos.Schema
sonra da model olustr=mongoose.model

controller ile db sel işlemler yap
