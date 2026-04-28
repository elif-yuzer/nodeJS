const { Sequelize } = require('sequelize');
require('dotenv').config();

//*pg kutuphanesi ile yaptgım new pool() ısın karsılıgı
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',  //benım adaptorum
    dialectOptions: {
      ssl: { rejectUnauthorized: false }  //bulut ile iletiişime geciyorum
    }

  },
  {
     pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
   },
);


//*senkronize işlemi sadece bır kere calısıyor.
//*sync(): "Yukarıda çizdiğim krokiye (Model) bak, eğer veritabanında böyle bir tablo yoksa benim için oluştur" komutudur.
sequelize.sync()


 sequelize.authenticate()  //*baglantıyı test ediyor
  .then(() => console.log("DB Bağlantı hazır "))  //*db ye gıdıp gelmek zaman aldıgı ıcın gerı kalan kaodları bloklamamak lazım
  .catch((err) => console.log("Hata:", err.message));

  
  module.exports = sequelize;