-- bu artik bir yorum satiridir. single line

/*
Multi line 
comment
*/

-- SELECT 1 AS one -- tek block islemleri icin noktali virgul zorunlu degildir

-- SELECT 1 AS two; -- bundan sonrasi yorumdur. SELECT 2 as two

-- SELECT 1 AS two; /* araya yorum ekeleye biliriz*/ 2 AS two;

-- NOT Case-sensitive (case-insensitive)
-- select 1 as one; -- piyasa standardina uygun degildir.
-- SELECT 1 AS one;

-- * Piyasa Standartları:
-- * * SQL Temel komutları BÜYÜK harfle yazılır. SELECT * FROM Album WHERE AlbumID=1;
-- * * String verilerde tek-çift tırnak kullanabilirsiniz. Standart olan tek tırnaktır.  SELECT 'string' AS yazi;
-- * * Her bir temel komut yeni bir satıra yazılır:

--- --- --- SQL --- --- ---

-- * SELECT - Sec ve getir.
-- * FROM - Hangi tabldon ?
SELECT * FROM Album; -- '*' = tum sutunlar.
SELECT AlbumId, Title FROM Album; -- Istedigim sutunlari getir. bu tavsiye edilen yazilim.

-- * AS - Tablo veya sutunlari gecici adlandirmak icin kullanilir. Lakap takma
SELECT 'data' AS baslik; -- data gonder
SELECT 1+2 AS sonuc; -- matematiksel ifade yazdir
SELECT AlbumId AS numara, Title AS baslik FROM Album; -- sutunlari isimlendirme
SELECT AlbumId + 3 AS numara, Title AS baslik FROM Album;
SELECT Album.AlbumId AS numara, Album.Title AS baslik FROM Album;
SELECT a.AlbumId, a.Title FROM Album AS a; -- tabla isimlendirme
SELECT a.AlbumId AS numara, a.Title AS baslik FROM Album AS a;
SELECT a.AlbumId numara, a.Title baslik FROM Album a; -- AS kullanmadan da isimlendirme mumkun

-- * DISTINCT - Tekrar edilen kayitlarin tekrar edilmesini engeller (tek kayit kayit getirir;
SELECT * FROM Customer;
SELECT DISTINCT City FROM Customer;
SELECT DISTINCT City, Country FROM Customer; -- butun sutunlardaki ortak olanlari 1 kere getirir

-- * WHERE - Filtreleme
SELECT * 
FROM Customer
WHERE Country = 'Germany'; -- esit olani getir

SELECT * 
FROM Customer
WHERE Country != 'USA'; -- esit olmayanlari getir

SELECT * 
FROM Customer
WHERE Country <> 'USA'; -- esit olmayanlari getir

SELECT * 
FROM Customer
WHERE CustomerId > 20; -- buyuk olanlari getir

SELECT * 
FROM Customer
WHERE CustomerId >= 20; -- buyukEsit olanlari getir

SELECT * 
FROM Customer
WHERE CustomerId < 20; -- kucuk olanlari getir

SELECT * 
FROM Customer
WHERE CustomerId <= 20; -- kucukEsit olanlari getir

-- * WHERE - BETWEEN/AND/OR/NOT/
SELECT * FROM Customer WHERE CustomerId BETWEEN 10 AND 20; -- 10 ile 20 arasinda olanlari geit (her ikiside dahil)
SELECT * FROM Customer WHERE NOT Country = 'USA';
SELECT * FROM Customer WHERE Country = 'USA' AND Company NOT NULL;
SELECT * FROM Customer WHERE Country = 'USA' OR Country = 'Germany' OR Country = 'Brazil';
SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Germany' OR Country = 'Brazil') AND CustomerId > 25;
SELECT * 
FROM Customer 
WHERE (Country = 'USA' 
	OR Country = 'Germany' 
	OR Country = 'Brazil') 
	AND (CustomerId BETWEEN 25 AND 28);

-- * WHERE - IN / NOT IN
SELECT * FROM Customer WHERE Country IN ('USA', 'Germany', 'Brazil');
SELECT * FROM Customer WHERE Country NOT IN ('USA', 'Germany', 'Brazil');
SELECT * FROM Customer WHERE CustomerId IN (3,5,7,10);


-- * WHERE - LIKE (SpecialChars: % = JokerChar, _ = SingleChar)
SELECT * FROM Customer WHERE Country LIKE 'USA'; -- "USA" olanlar.
SELECT * FROM Customer WHERE Address LIKE '627 Broadway'; -- "627 Broadway" olanlar.
SELECT * FROM Customer WHERE Address LIKE '627%'; -- "627" ile baslayan kayitlari.
-- SELECT * FROM Customer WHERE Country LIKE 'Germany';
SELECT * FROM Customer WHERE Address LIKE '%34'; -- "34" ile biten kayitlari.
SELECT * FROM Customer WHERE Address LIKE '%Stra%'; -- icinde "stra" olan kayitlar.
SELECT * FROM Customer WHERE Phone LIKE '_55 %'; -- 2. ve 3. karakteri 55 olan kayıtlar.
SELECT * FROM Customer WHERE Address LIKE '_a_%'; -- 2. karakteri "a" olan ve en az 3 karakter olan.
SELECT * FROM Customer WHERE Phone LIKE '+__ 030%'; -- Ülke kodu bilinmeyen 030 ile başlaya telefonlar.
SELECT * FROM Customer WHERE Phone LIKE '+__ 030%' AND FirstName = 'Niklas'; -- Niklas isimli 030 ile başlayan numaralı kayıtlar.


-- * ORDER BY - Siralama
-- * ASC - A-Z sirlama
-- * DESC - Z-A sirlama

SELECT * FROM Customer ORDER BY Country ASC;
SELECT * FROM Customer ORDER BY Country; -- Default: ASC
SELECT * FROM Customer ORDER BY Country DESC;
SELECT * FROM Customer ORDER BY Country ASC, City ASC, LastName DESC; -- sirayla sirlama Country, City, LastName.
SELECT * FROM Customer ORDER BY Country, City, FirstName; 
-- ? Ulkesi usa ve brazil olan ve CustomerId 12 den buyuk olan ve Company nul olmayan verileri Company e gore asc sirala 
SELECT * 
FROM Customer 
WHERE Country IN( 'USA','Brazil') 
	AND CustomerId>12 
	AND Company NOT NULL 
ORDER BY Company ASC;


-- * LIMIT - Belli sayıda kayıt getir.
SELECT * FROM Customer LIMIT 0, 10; -- LIMIT kacinci kayittan itibaren kac adet kayit.
SELECT * FROM Customer LIMIT 10; -- default baslangic: 0
SELECT * FROM Customer LIMIT 10, 5; -- 10. kayittan sonraki 5 adet kaydi getir.
SELECT * FROM Customer ORDER BY FirstName LIMIT 5;