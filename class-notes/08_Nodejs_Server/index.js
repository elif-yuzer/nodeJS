'use strict'

//** node on ekı
// ?//?node: ön eki (prefix), bu modülün dışarıdan yüklenen bir kütüphane değil, Node.js'in "Core Library" (Çekirdek Kütüphane) katmanına ait olduğunu garanti eder. Bu, güvenliği ve hızı artırır. */
const http=require("node:http")

require('dotenv').config()


//** process nesnesi gorevi
// ?process nesnesi nodejs in os ile konustugu pencere, portu okuruz .envden process ile */
const PORT=process.env.PORT ?? 5000


let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];




/**  verininin buffer gelmesi 
//?veri buffer(bytler halinde chunk halınde yani  devasa verı olarak gelmıyor parca parca gelıyor, port ile requeste gelıyor bız bunu libuv kutuphanse ile okuyup chunk halınde alıyorzode: ön eki (prefix), bu modülün dışarıdan yüklenen bir kütüphane değil, Node.js'in "Core Library" (Çekirdek Kütüphane) katmanına ait olduğunu garanti eder. Bu, güvenliği ve hızı artırır.)
*/

function parseRequestBody(req,callback) {
    


  //*Bu fonksiyon veriyi let body = "" diyerek bir string içinde biriktiriyo
  let body = "";




  //**

//?Olay Tabanlı Mimari (Event-Driven): req objesi bir Readable Stream'dir. Node.js, ağ üzerinden gelen ham baytları (binary) parça parça yakalarKitapta anlatılan I/O yavaşlığı nedeniyle veri tek seferde gelmez. Her parça ulaştığında data olayı tetiklenir. Sen burada bir "koleksiyoncu" gibi bu parçaları body değişkeninde biriktiriyorsun req.on("end", () => { ... }). */

  req.on("data", (chunk) => {
    body += chunk;
})

//*
//*?inalizasyon: Musluk kapandığında (tüm veri geldiğinde) end olayı fırlatılır. Artık elimizdeki tüm parçaları birleştirip (JSON.parse) anlamlı bir objeye dönüştürme zamanıdır.*/
req.on("end", () => {

    //*İlk parametresi her zaman hatadır (err). Hata yoksa null geçilirİkinci parametresi ise veridir..


    try {
      callback(null, JSON.parse(body));
    } catch (err) {
      callback(err);
    }
}

)}

//*createserver ve listener

// ?her yeni http isteği httpcreate servera verdiğimz listner sayesınde tanımlı olan porttan gelen http isteğini fırlatır event benım yazdıgım bu buyk callback fonksıyonu handler fonksıyonu yanı tepki*/

const server = http.createServer((req, res) => {
  console.log(req.method,req.url);
  console.log(req.url.split("/")[2]); 
    res.setHeader("Content-Type", "application/json");  //?her response için

  //?Sen bu satırı yazdığında, aslında Event Loop'a şunu demiş oluyorsun: "Dış dünyadan 8000. porta bir HTTP isteği gelirse, bu asenkron fonksiyonu çalıştırKitabın 1. bölümünde anlatıldığı gibi, bu fonksiyon bir **"Handler"**dır. Node.js isteği alırken ana thread'i bloklamaz; istek tam olarak ulaştığında bu handler "dispatch" edilir (tetiklenir) yanı verı geldıkce createServer ile olusturdgum callback handler fonksıyonm dıspatch ediliyor..


  //*
  //?Gelen verinin analizi : node js cekırdegı bıze ham bır req objesı verıyor su route git demez.Ben aslında burda bir demultiplexer yapıyorm yanı gelen trafgı url (/)uzerınden ve GET metot suzgecınden gecirerek dogru ıse yonlendırıyorm*/

  if (req.url == "/" && req.method == "GET") {

    //*res.writeHeadBu satır, tarayıcıya (veya Postman'e) giden paketin en başına "Her şey yolunda (OK)" damgasını basar.
    res.writeHead(200);

    //*res.write=youtube donarak video izleme benzetmesi
    //*Sen res.write('data') dediğinde, bu veri aslında hemen kabloya çıkıp gitmez. Node.js'in içinde Writable Stream için ayrılmış küçük bir "bekleme odası" (Internal Buffer) vardırVeri Gönderimi: Sen res.write dedikçe veri bu odaya dolarğ Hızı: Eğer internet hızlıysa, oda dolar dolmaz veri boşaltılır ve karşı tarafa gönderilir: Senin örneğindeki gibi internet giderse veya karşı taraf çok yavaşsa, o "bekleme odası" (Buffer) dolmaya başlarnternet yok ama sen kodunda sürekli res.write yapmaya devam ediyorsun. Bu veriler RAM'de birikmeye başlar. Eğer bu kontrol edilmezse, sunucunun RAM'i dolar ve sistem çökerres.write() fonksiyonu aslında bir boolean (true/false) değer döndürür
    ///*Eğer true dönerse: "Yerim var, yazmaya devam et."

    //*Eğer false dönerse: "Dur! Buffer doldu, daha fazla yazma, önce bunları bir göndereyim.".....

    

    //*res.end() çağrısı çok kritiktir. Eğer bu fonksiyonu çağırmayı unutursan, bağlantı asla kapanmaz (Time-out olana kadar). Bu da sunucundaki kaynakların (Socket ve RAM) sonsuza dek meşgul kalmasına neden olurİşte video izlerken internet gittiğinde yaşanan duraksama, aslında sistemin o anki veriyi tüketmesini beklemesidir. İnternet geldiğinde Node.js bir "drain" (boşalma) olayı fırlatır ve "Tamam, oda boşaldı, yeni verileri gönderebilirsin" der..
    res.end(

      //*Serialization: JSON.stringify ile JavaScript dünyasındaki bir objeyi, ağ üzerinden akabilecek bir String (Metin) haline getiriyorsun.
      JSON.stringify({
        error: false,
        message: "body si bos bır ıstek geldı",
      })
    );
  }else if (req.url.match(/^\/users\/(\d+)$/) && req.method == "GET"){
   
    const id=Number(req.url.split("/")[2])
    const user=users.find((user)=>id===user.id)

    if(!user) {
      res.writeHead(404)
      return res.end(
        JSON.stringify({
          err:true,
          message:"User not found"
        })
      )
    }

    res.end(
    JSON.stringify({
      error:false,
      data:user

    })
    )
  } else if (req.url === "/users" && req.method === "GET") { // ✅ /:id'den önce
    res.writeHead(200);
    res.end(
      JSON.stringify({
        error: false,
        data: users,
      })
    );
    console.log(users);

  } else if (req.url.match(/^\/users\/(\d+)$/) && req.method == "GET") {
    const id = Number(req.url.split("/")[2]);
    const user = users.find((user) => id === user.id);

    if (!user) {
      res.writeHead(404);
      return res.end(
        JSON.stringify({
          err: true,
          message: "User not found",
        })
      );
    }

    res.writeHead(200);
    res.end(
      JSON.stringify({
        error: false,
        data: user,
      })
    );

  } else if (req.url === "/users" && req.method === "POST") {
    parseRequestBody(req, (err, data) => {
      if (err || !data.name) {
        res.writeHead(400);
        return res.end(
          JSON.stringify({
            error: true,
            message: "invalid json",
          })
        );
      }

      const newUser = { id: users.length + 1, name: data.name };
      users.push(newUser);

      res.writeHead(201);
      res.end(
        JSON.stringify({
          error: false,
          message: newUser,
        })
      );
    });

  } else {
    
    res.writeHead(404);
    res.end(
      JSON.stringify({
        error: true,
        message: "Route bulunamadı",
      })
    );
  }
});

server.listen(PORT, () =>
  console.log(`server started: http://127.0.0.1:${PORT}`)
);



