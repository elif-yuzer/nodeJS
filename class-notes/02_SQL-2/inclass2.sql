-- Active: 1775634234230@@127.0.0.1@3306
select * from "Customer"

--? fonksiyonlar

SELECT *
FROM "Invoice" --?toplam fatura miktari

SELECT SUM(Total) FROM "Invoice";

--? faturaları ulkeye gore gruplama

SELECT * FROM "Invoice" GROUP BY "BillingCountry";

--? herbir ulke ıcın kesilen ortalama fatura mıktarları getır

SELECT "BillingCountry", round(avg("Total"), 2)
from "Invoice"
GROUP BY
    "BillingCountry";

SELECT "BillingCountry", count(*) as countofbill
FROM "Invoice"
GROUP BY
    "BillingCountry"
ORDER BY countofbill

--?ulkeye gore toplam adet ve tutarları getir
SELECT
    "BillingCountry",
    COUNT("InvoiceId") AS "Toplam Fatura Sayisi",
    SUM("Total") AS "Total Bill"
FROM "Invoice"
GROUP BY
    "BillingCountry"
ORDER BY "BillingCountry" DESC;

--?  having
--? toplam fatura tutarı 100 den fazla olan ulkelerı sıralam

SELECT * FROM "Customer"

--SELECT "BillingCountry", sum("Total") 'Total bill' FROM "Invoice" GROUP BY """BillingCountry" HAVING sum()
SELECT
    "BillingCountry",
    count("InvoiceId") as "Fatura Sayisi"
FROM "Invoice"
GROUP BY
    "BillingCountry"
HAVING
    count("InvoiceId") > 35

SELECT "BillingCountry", round(avg(Total), 2) 'ortalama fatura'
FROM "Invoice"
GROUP BY
    "BillingCountry"
HAVING
    avg("Total") > 6

--?subquery

--?ortalamadan yuksek faturalar
SELECT *
from "Invoice"
WHERE
    "Total" > (
        SELECT avg("Total")
        FROM "Invoice"
    )

SELECT "BillingCountry", count("InvoiceId") 'Fatura Sayisi', sum("Total") "Toplam"
FROM "Invoice"
WHERE
    "Total" > (
        SELECT avg("Total")
        FROM "Invoice"
    )
GROUP BY
    "BillingCountry"
ORDER BY Toplam DESC

SELECT * FROM "Album"

--SELECT * FROM "Album"
--WHERE "ArtistId" = (
-- SELECT "ArtistId" FROM "Artist"
--  WHERE "Title"='Mark Philips'
);

SELECT *
FROM Invoice
WHERE
    CustomerId = (
        SELECT "CustomerId"
        FROM "Customer"
        WHERE
            "FirstName" = 'Mark'
            AND "LastName" = 'Philips'
    )

SELECT FirstName, LastName
FROM "Customer"
WHERE
    "CustomerId" = (
        SELECT "CustomerId"
        FROM "Invoice"
        GROUP BY
            "CustomerId"
        ORDER BY max("Total") DESC
        LIMIT 1
    ); 

/* customer tablosundakı tum musterıler
 */

 SELECT * from "Customer"

