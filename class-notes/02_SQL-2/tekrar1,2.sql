-- =========================================================
-- SQL STUDY NOTES (Chinook-style)
-- Cleaned and organized version
-- =========================================================

-- =========================================================
-- 1) BASIC SELECT
-- =========================================================

SELECT * FROM "Customer";

SELECT "InvoiceId", "Total"
FROM "Invoice";

SELECT "FirstName" AS Ad
FROM "Customer"
ORDER BY Ad ASC;

SELECT DISTINCT "Country"
FROM "Customer";

SELECT *
FROM "Customer"
LIMIT 5;

-- =========================================================
-- 2) WHERE CONDITIONS
-- =========================================================

-- Customers from USA
SELECT *
FROM "Customer"
WHERE "Country" = 'USA';

-- CustomerId between 10 and 20
SELECT *
FROM "Customer"
WHERE "CustomerId" BETWEEN 10 AND 20;

-- Countries except USA
SELECT "Country"
FROM "Customer"
WHERE "Country" != 'USA';

-- Customers from USA, Germany, or Brazil
SELECT "Country" AS Ulkeler
FROM "Customer"
WHERE "Country" IN ('USA', 'Germany', 'Brazil')
ORDER BY Ulkeler ASC;

-- Countries USA, Germany, Norway and CustomerId > 25
SELECT "Country"
FROM "Customer"
WHERE "Country" IN ('USA', 'Germany', 'Norway')
  AND "CustomerId" > 25;

-- Customers from USA or Germany with CustomerId between 25 and 40, sorted by city
SELECT *
FROM "Customer"
WHERE "Country" IN ('USA', 'Germany')
  AND "CustomerId" BETWEEN 25 AND 40
ORDER BY "City" ASC;

-- =========================================================
-- 3) LIKE
-- =========================================================

-- Address starts with 627
SELECT *
FROM "Customer"
WHERE "Address" LIKE '627%';

-- FirstName starts with A
SELECT "FirstName"
FROM "Customer"
WHERE "FirstName" LIKE 'A%';

-- Customers whose phone starts with +1
SELECT *
FROM "Customer"
WHERE "Phone" LIKE '+1%'
ORDER BY "LastName" DESC;

-- =========================================================
-- 4) NULL CHECKS
-- =========================================================

SELECT *
FROM "Customer"
WHERE "State" IS NOT NULL
  AND "Company" IS NULL
ORDER BY "Country" ASC, "FirstName" DESC
LIMIT 5;

-- =========================================================
-- 5) ORDER BY / LIMIT / OFFSET
-- =========================================================

-- Sort customers by FirstName, skip first 10 rows, get next 5
SELECT *
FROM "Customer"
ORDER BY "FirstName" ASC
LIMIT 5 OFFSET 10;

-- Top 3 invoices with the highest total
SELECT *
FROM "Invoice"
ORDER BY "Total" DESC
LIMIT 3;

-- =========================================================
-- 6) AGGREGATE FUNCTIONS
-- =========================================================

-- Get the total number of invoices in the Invoice table
SELECT COUNT(*) AS total_invoices
FROM "Invoice";

-- Get the sum of all invoice totals
SELECT SUM("Total") AS total_invoice_amount
FROM "Invoice";

-- Get the average invoice total rounded to 2 decimal places
SELECT ROUND(AVG("Total"), 2) AS avg_invoice_total
FROM "Invoice";

-- Get the minimum and maximum invoice totals
SELECT MIN("Total") AS min_total,
       MAX("Total") AS max_total
FROM "Invoice";

-- Count how many distinct countries have invoices
SELECT COUNT(DISTINCT "BillingCountry") AS country_count
FROM "Invoice";

-- =========================================================
-- 7) GROUP BY
-- =========================================================

-- Count how many invoices are issued for each country
SELECT "BillingCountry", COUNT("InvoiceId") AS invoice_count
FROM "Invoice"
GROUP BY "BillingCountry";

-- Count invoices per country and sort by count descending
SELECT "BillingCountry", COUNT("InvoiceId") AS cnt
FROM "Invoice"
GROUP BY "BillingCountry"
ORDER BY cnt DESC;

-- Get total invoice amount and count of invoices per country
SELECT "BillingCountry",
       SUM("Total") AS total_amount,
       COUNT("InvoiceId") AS invoice_count
FROM "Invoice"
GROUP BY "BillingCountry";

-- Get total invoice per country as Toplam and sort descending
SELECT "BillingCountry", SUM("Total") AS Toplam
FROM "Invoice"
GROUP BY "BillingCountry"
ORDER BY Toplam DESC;

-- Get total invoice amounts for USA and Canada grouped by country
SELECT "BillingCountry",
       SUM("Total") AS total_amount
FROM "Invoice"
WHERE "BillingCountry" IN ('USA', 'Canada')
GROUP BY "BillingCountry";

-- Group by country and city and get customer counts
SELECT "Country", "City", COUNT(*) AS customer_count
FROM "Customer"
GROUP BY "Country", "City"
ORDER BY "Country", "City";

-- =========================================================
-- 8) HAVING
-- =========================================================

-- Get countries with more than 35 invoices
SELECT "BillingCountry",
       COUNT("InvoiceId") AS invoice_count
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING COUNT("InvoiceId") > 35;

-- Get countries with an average invoice total greater than 6
SELECT "BillingCountry",
       ROUND(AVG("Total"), 2) AS average
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING AVG("Total") > 6;

-- Get countries with more than 5 invoices, sorted by total descending
SELECT "BillingCountry",
       SUM("Total") AS total_sales
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING COUNT("InvoiceId") > 5
ORDER BY total_sales DESC;

-- Get average invoice total per country as ort_tutar (2 decimals), only if > 5
SELECT "BillingCountry",
       ROUND(AVG("Total"), 2) AS ort_tutar
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING AVG("Total") > 5;

-- =========================================================
-- 9) SUBQUERIES
-- =========================================================

-- Get invoices with a total greater than the average invoice total
SELECT *
FROM "Invoice"
WHERE "Total" > (
    SELECT AVG("Total")
    FROM "Invoice"
);

-- Get all invoices for the customer named 'Mark Philips'
SELECT *
FROM "Invoice"
WHERE "CustomerId" = (
    SELECT "CustomerId"
    FROM "Customer"
    WHERE "FirstName" = 'Mark'
      AND "LastName" = 'Philips'
);

-- Get names of customers whose invoice total is greater than 10
SELECT "FirstName", "LastName"
FROM "Customer"
WHERE "CustomerId" IN (
    SELECT "CustomerId"
    FROM "Invoice"
    GROUP BY "CustomerId"
    HAVING SUM("Total") > 10
);

-- Get the country with the most invoices issued
SELECT "BillingCountry",
       COUNT("InvoiceId") AS count_invoice
FROM "Invoice"
GROUP BY "BillingCountry"
ORDER BY count_invoice DESC
LIMIT 1;

-- Get customers who have never made an invoice
SELECT "FirstName", "LastName"
FROM "Customer"
WHERE "CustomerId" NOT IN (
    SELECT "CustomerId"
    FROM "Invoice"
);

-- Group invoices above average total by country and get total per country
SELECT "BillingCountry",
       SUM("Total") AS total_per_country
FROM "Invoice"
WHERE "Total" > (
    SELECT AVG("Total")
    FROM "Invoice"
)
GROUP BY "BillingCountry";

-- =========================================================
-- 10) JOIN-BASED SOLUTIONS
-- =========================================================

-- Get the name of the customer with the highest single invoice total
SELECT c."FirstName",
       c."LastName",
       i."Total"
FROM "Invoice" i
JOIN "Customer" c
  ON i."CustomerId" = c."CustomerId"
ORDER BY i."Total" DESC
LIMIT 1;

-- For each customer, get their maximum invoice total along with their name
SELECT c."CustomerId",
       c."FirstName",
       c."LastName",
       MAX(i."Total") AS max_invoice_total
FROM "Customer" c
JOIN "Invoice" i
  ON c."CustomerId" = i."CustomerId"
GROUP BY c."CustomerId", c."FirstName", c."LastName"
ORDER BY max_invoice_total DESC;

-- Customers who have never made an invoice (LEFT JOIN version)
SELECT c."CustomerId",
       c."FirstName",
       c."LastName"
FROM "Customer" c
LEFT JOIN "Invoice" i
  ON c."CustomerId" = i."CustomerId"
WHERE i."InvoiceId" IS NULL;

-- =========================================================
-- 11) DISTINCT / ORDER / LIMIT PRACTICE
-- =========================================================

-- Get first 10 distinct countries with invoices in alphabetical order
SELECT DISTINCT "BillingCountry"
FROM "Invoice"
ORDER BY "BillingCountry" ASC
LIMIT 10;

-- Get countries with average total above overall average, sort descending, limit 5
SELECT "BillingCountry",
       ROUND(AVG("Total"), 2) AS avg_total
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING AVG("Total") > (
    SELECT AVG("Total")
    FROM "Invoice"
)
ORDER BY avg_total DESC
LIMIT 5;

-- =========================================================
-- 12) THEORY NOTES
-- =========================================================

-- Which keyword filters aggregate results in a GROUP BY query?
-- ANSWER: HAVING

-- Difference between COUNT(*) and SUM("Total")
-- COUNT(*) counts rows
-- SUM("Total") adds numeric values in "Total"

-- Difference between COUNT(*) and COUNT("Company") if Company can be NULL
-- COUNT(*) counts all rows
-- COUNT("Company") counts only non-NULL Company values

-- Can an alias defined in SELECT be used in HAVING?
-- Best practice: NO (use the aggregate function directly in HAVING)

-- Correct logical SQL execution order:
-- 1. FROM
-- 2. WHERE
-- 3. GROUP BY
-- 4. HAVING
-- 5. SELECT
-- 6. ORDER BY
-- 7. LIMIT

-- WHERE filters rows before grouping
-- HAVING filters groups after grouping

-- =========================================================
-- END
-- =========================================================