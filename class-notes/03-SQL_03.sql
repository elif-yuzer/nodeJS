-- LEFT JOIN: All records from the left table and matching records from the right table
--? Her bir sanatçı ve ona ait albümleri listeleme (LEFT JOIN)
SELECT ar.ArtistId, ar.Name, al.Title
FROM Artist AS ar
LEFT JOIN Album AS al ON ar.ArtistId = al.ArtistId
ORDER BY ar.ArtistId ASC, al.Title ASC;

-- RIGHT JOIN: All records from the right table and matching records from the left table
--? Albüm bilgileri ile sanatçı bilgilerini birleştirme (RIGHT JOIN)
SELECT ar.ArtistId, ar.Name, al.Title
FROM Artist AS ar
RIGHT JOIN Album AS al ON ar.ArtistId = al.ArtistId
ORDER BY ar.ArtistId ASC, al.Title ASC;

-- INNER JOIN: Only matching records from both tables
--? Müşteri bilgileri ile fatura bilgilerini birleştirme (INNER JOIN)
SELECT c.CustomerId, c.FirstName, c.LastName, c.Country, i.InvoiceId, i.InvoiceDate, i.Total InvoiceTotal
FROM Customer c
INNER JOIN Invoice i ON c.CustomerId = i.CustomerId
ORDER BY c.CustomerId, i.InvoiceId;


-- FULL OUTER JOIN: All records from both tables, matching where possible
--? Albüm ve sanatçı bilgilerini birleştirme (FULL OUTER JOIN)
SELECT *
FROM Artist AS art
FULL OUTER JOIN Album AS alb ON alb.ArtistId = art.ArtistId
ORDER BY art.ArtistId ASC, alb.AlbumId ASC;

-- 3-table JOIN: Track, Album, Artist
--? Parça, albüm ve sanatçı bilgilerini birleştirme (3 tablo JOIN)
SELECT t.Name trackName, al.Title albumTitle, ar.Name artistName
FROM Track t
INNER JOIN Album al ON t.albumid = al.albumid
INNER JOIN Artist ar ON ar.artistid = al.artistid
ORDER BY ar.Name;


-- PRACTICE EXERCISES
-- Sanatçı adı ve albüm sayısını getirme
select ar.Name, count(al.AlbumId) TotalAlbum
from Artist ar
left join Album al on ar.ArtistId = al.ArtistId
group by ar.Name;

-- Albüm ID, Albüm Adı ve Sanatçı Adını getir, sanatçıyı isme göre büyükten küçüğe sırala
select al.albumId, al.title, ar.name
from Album al
inner join Artist ar on al.artistid = ar.artistid
order by ar.name desc;

-- En çok albümü olan ilk 5 sanatçıyı listeleyin
select ar.name, count(al.albumid) totalAlbum
from Album al
left join Artist ar on ar.artistId = al.artistid
group by ar.artistid
order by totalAlbum desc
limit 5;

-- Hiç albümü olmayan sanatçıları bulun
select ar.artistid, ar.name
from Artist ar
left join Album al on ar.artistid = al.artistid
where al.albumid is null;

-- Her müşterinin toplam harcama miktarını hesaplayın
select c.customerid, c.firstname, sum(i.total) TotalAmount
from Customer c
left join Invoice i on c.customerid = i.customerid
group by c.customerid
order by TotalAmount desc; 

