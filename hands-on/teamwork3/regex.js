//**
//? /Kullanıcıdan gelen veriyi doğrulamak (validation), veritabanına kaydetmeden önce kirli veriyi temizlemek (sanitization), logları analiz etmek veya URL yönlendirmelerini (routing) yönetmek için sürekli Regex kullanacaksın.


//*startsWith vs Regex — Bearer Token kontrolü

const authHeader = "Bearer eyJhbGciOiJIUzI1NiJ9.abc123";

if(!authHeader.startsWith("Baerer")){
    console.log("token yok ve ya yanlıs format");
}

//*hem format hem ıcerık kontrolu
const baererRegex=/^Baerer [A-Za-z0-9._-]+$/

//*^  başla  /  .../ slashlar regex kutum
//* $ bitir
//*[] izinli karakterler
///+ en az 1

//*Backend Önemi: Eğer çok karmaşık ve sürekli geriye dönen (backtracking) bir Regex yazarsan, kötü niyetli bir kullanıcı sunucuna özel hazırlanmış uzun bir metin göndererek CPU'nu %100'e kilitleyebilir. Buna backend dünyasında ReDoS (Regular Expression Denial of Service) saldırısı denir. Bu yüzden Regex'lerin sade ve net olmalıdır.

//?3. Karakter Kümeleri (Character Sets) ve Tekrarlar (Repetition)

/* İşte burası backend doğrulama işlemlerinin kalbidir.

    [a-z] sadece küçük harfleri, [0-9] sadece rakamları ifade eder.

    Kitaptaki sihirli kısaltmalar:

        \d (digit - rakam)

        \D (rakam OLMAYAN her şey)

        \w (harf, rakam ve alt çizgi)

        \s (boşluk, tab vb.)

    Tekrarlar: Bir karakterin kaç kere geçeceğini belirleriz. + (en az 1 kere), * (0 veya daha fazla), ? (0 veya 1), {n,m} (n ile m arası). */

if(!baererRegex.test
    (authHeader)
){
    console.log("gecersiz token");
}


//*senaryo 1 (Veri Temizleme / Sanitization)

//?frontendden gelen kirli cep numaralarını saf numara halinde almak 

/* const messyPhone='(505) 555 1515'

const neatPhone=messyPhone.replace(/\D/g, '') */

//digit olmayan herseyi bul bos strıng ıle degıstır


const field='    something    '

const valid=/\S/.test(field)
console.log(valid);

// 1. Adım: Sanitization (Kirli veriyi temizle - Regex ile)
//const messyPhone = req.body.phone; // Örn: "+90 (505) 123-4567"
//const neatPhone = messyPhone.replace(/\D/g, ''); // Sonuç: "905051234567"

// Ufak bir düzeltme: Eğer kullanıcı +90 yazdıysa başta 90 kalır. 
// Sadece son 10 haneyi almak için slice kullanabiliriz:
/* const finalPhone = neatPhone.slice(-10); //  */Sonuç: "5051234567"

// 2. Adım: Validation (Kuralları kontrol et - Yerleşik metotlarla)
/* if (finalPhone.length !== 10 || !finalPhone.startsWith('5')) {
    return res.status(400).json({ 
        error: true, 
        message: "Lütfen 5 ile başlayan, 10 haneli geçerli bir numara giriniz." 
    });
} */

// 3. Adım: Veritabanına kaydet (Artık veri %100 güvenli!)
// db.users.save({ phone: finalPhone })
const beer='asddds99sdsd999sd9sd9sd99'
const match = beer.match(/[0-9]+/);

//*match sadece string uzerınde calısır

console.log(match);



//*Kullanıcı Adı (Username) DoğrulamaKural: Kullanıcı adı mutlaka bir harf (a-z) ile başlamalıdır. Ardından en az 3, en fazla 6 adet rakam (0-9) gelmelidirGeçersiz olanlar: a12 (rakam eksik), 12345 (harfle başlamamış), z1234567 (çok fazla rakam).. Eğer büyük harfleri de (A123 gibi) kabul etmek istersen, desenin sonuna case-insensitive anlamına gelen i bayrağını ekleyebilirsin: /^[a-z]\d{3,6}$/i veya ^[a-zA-Z] şeklinde de yazabilirsin



const user =/^[a-z]\d{3,6}$i/

console.log(user.test("a123")); 
console.log(user.test("a12"));
console.log(user.test("A123"));


//*esnek telefon  numarası Geçerli olanlar: 555-1234, 212-555-1234
//*Geçersiz olanlar: 5551234 (tire yok), 12-555-1234 (alan kodu 3 hane değil).





const phone = /^(\d{3}-)?\d{3}-\d{4}$/

console.log(phone.test("555-477-8989"));       
console.log(phone.test("12-555-1234"));   
console.log(phone.test("1234-555-1234"));