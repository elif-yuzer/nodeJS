//*expression and nonexpression
//*ustabası geldı a vıdasını b vıdasına montala dese nonexpression
// *ama sonucu getır dese expression
//*İşlem Önceliği (Operator Precedence) ve Birleşme Yönü (Associativity)./*

//*JavaScript'te atama operatörleri (eşittir işareti) sağdan sola doğru çalışır.
//?15 i hesaplar sonra atama ıslemını de en soldan baslar ılk y ye atar.boylece her iki degisşkende aynı anda aynı degeri almıs olur
/* let x, y;
y = x = 3 * 5;
y = x = 15;

const x1 = 5;
const y1 = 3 - -x1;
console.log(y1); */

a = 2;
const r1 = a++ + a++;
//*a yı al 1 arttır ->a arttı ve a=3 oldu topla 2+3 ama son durum a=4 eval left to right;
console.log(r1);
console.log(a);

const n=5
const s='5'
console.log(n==s);
console.log(n===s);
console.log(n!==Number(s));
console.log(n==Number(s));
const a1 = { name: "an object" };
const b1= { name: "an object" };

console.log(a1==b1);
console.log(a1===b1);

console.log(3<2<6);
console.log(4>3>4);   //* 4 buyuk 3 dogru sonucu true 1 degerini dondurur karsılastırmada 1>4 mu olayına doner durum

//* bilgisayarların donanımsal dili olan ikilik sistem için de geçerlidir. Onluk sistemdeki 0.1 sayısını ikilik sisteme (binary) çevirmeye çalıştığınızda tam bir karşılığı yoktur; sonsuza kadar devreden bir sayı dizisi oluş.pc bellegı 64 bıt ıle sınırlı
//*epsilon:Metinde bahsedilen o özel sabit (Epsilon), tam olarak işlemcinin bu yuvarlamayı yaparken yaratabileceği maksimum hata payını temsil ederBu yüzden iki kesirli sayının birbirinin aynısı olup olmadığını kontrol ederken "Bunlar birebir eşit mi?" sorusu yazılım dünyasında tehlikelidir. Bunun yerine "Bu iki sayı arasındaki fark, işlemcinin matematiksel hata payından (Epsilon) daha mı küçük?" sorusu sorulur. Eğer aralarındaki fark bu mikro hata payından ufaksa, makinenin donanımsal kusuru görmezden gelinir ve "Pratik olarak bu iki sayı eşittir" kabulü yapılırEğer böyle büyük çaplı ve finansal verilerin işlendiği bir projede yer alsaydınız, kayan noktalı sayıların bu donanımsal hata payından tamamen kaçınmak için mimari düzeyde nasıl bir veri modelleme stratejisi kurgulamayı tercih ederdiniz?.


/* console.log(c===d);

let n = 0;
while(true) {
n += 0.1;
if(n === 0.3) break;
}
console.log(`Stopped at ${n}`)



let n = 0;
while(true) {
n += 0.1;
if(Math.abs(n - 0.3) < Number.EPSILON) break;
}
console.log(`Stopped at ${n}`);; 
*/


console.log(3+5+'8');
console.log('3' + 3 + 5);


//*logical operators

console.log(!!1);
console.log(!!"");
console.log("");
console.log(!!"false");
console.log(typeof []);//*tip soyler
console.log([]);
console.log(![]);
console.log(!![]); 

//*primitive ilkel degerler :dogrudan bır deger tasıyordu(0, "", null, undefined, false, NaN)
//*reference: bellekte bır neseneye isaret eder([], {}, function(){}, new Date())

console.log(!!null);
const a2=null
console.log(a2);
console.log(2+ null);
console.log([].length);

//*short-circuit evaluation
e=true
f=true
g=false
console.log(e && f && g);
console.log(e || f || g );
h=true
console.log(!h);
h=!h
console.log(h);
h=!!h
console.log(h);

isLoggedIn=false
isLoggedIn && console.log("Hoş geldin!");

const isAdmin = true;
isAdmin || console.log("Yetkin yok");


//*comma operators
let x=0 ,y=10,z
z=(x++,y++)
console.log(x);
console.log(z);