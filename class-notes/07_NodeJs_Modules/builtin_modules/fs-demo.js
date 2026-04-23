const fs=require('fs')

const path=require('path')

//*dosya yazma
//* async-callback ile

//*kodun amacı dosyayı yazarken programın gerı kalanını bloklamadan devam etmesi



fs.writeFile(path.join(__dirname, 'inclassasync.txt'),
'Bu txt async ile olusturuldu',
'utf-8',
function(hata) {
    if(hata){
        console.log('hata',hata.message);
   return
    }
 

    console.log("dosya async ile yazıldı");
}



)


//*sync ile
fs.writeFileSync(path.join(__dirname,'dosya.txt'),
'dosyanın ıcerıgıne bırseyler yazdım\nbu dosyayı node yazıyor',

'utf-8',
)

console.log("dosya yazıldı");


//*async okuma

fs.readFile(path.join(__dirname,'inclassasync.txt'),
'utf-8',
function(hata,icerik){
    if(hata){
        console.log("okuma hatası",hata.message);

    }
       console.log('☼ Async okunan:\n', icerik);
}
)

//*dosya varmı kontrol

const dosyaYolu=path.join(__dirname,'inclassasync.txt')

if(fs.existsSync(dosyaYolu)){
    console.log("dosya var");

    //*dosya ıcerık ekleme

fs.appendFileSync(dosyaYolu,'\nyeni bir satır ekledm')
console.log("dosya guncellendı")
}else {
    console.log("dosya yok");
}

// Klasör oluşturma
const klasörYolu = path.join(__dirname, 'yeni-klasör');

if (!fs.existsSync(klasörYolu)) {
   console.log('Klasör yok');
  fs.mkdirSync(klasörYolu);
   console.log('Klasör oluşturuldu'); } else {
   console.log('Klasör var');
 }

//Yeni klasör içine dosya yazma:

 fs.writeFileSync(
  path.join(klasörYolu, 'yeni.txt'),
   'Klasör içindeki dosya',
   'utf-8',
);

// Klasör listeleme:

const dosyalar = fs.readdirSync(__dirname);
console.log('Klasördeki dosyalar:', dosyalar);



