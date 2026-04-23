const path = require('path'); //built-in olduğu için -./ yok

// Mevcut Dosyanın Tam Yolu:
console.log('__filename:', __filename);

// Mevcut Dosyanın Bulunduğu Klasör:
console.log('__dirname:', __dirname);

// Yol Birleştirme:
const TamYol = path.join(__dirname, '../http', 'server.js');
console.log('join:', TamYol);

// Dosya Adı:
console.log('basename:', path.basename(__filename));

// Uzantısız Dosya Adı:
console.log('Uzantısız basename:', path.basename(__filename, '.js'));

// Uzantı:
console.log('extname:', path.extname(__filename));

// Yolu Parçalama:
const parçalar = path.parse(__filename);
console.log('parse:', parçalar);
