-- Show related probe_reading, probe_station records (up to 20).
SELECT t0."id" AS "probe_reading_id",
       t0."observed_at" AS "probe_reading_observed_at",
       t1."id" AS "probe_station_id",
       t1."station_code" AS "probe_station_station_code"
FROM portfolio."probe_reading" t0
JOIN portfolio."probe_station" t1 ON t0."station_id" = t1."id"
ORDER BY t0."id", t1."id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."id" AS "probe_reading_id",
       t0."observed_at" AS "probe_reading_observed_at",
       t1."id" AS "probe_station_id",
       t1."station_code" AS "probe_station_station_code"
FROM portfolio."probe_reading" t0
JOIN portfolio."probe_station" t1 ON t0."station_id" = t1."id"
ORDER BY t0."id", t1."id"
LIMIT 20;

-- Find probe_reading records where observed_at matches "2025-02-10T12:00:00Z" (up to 20).
SELECT * FROM portfolio."probe_reading"
WHERE "observed_at" IS NOT DISTINCT FROM '2025-02-10T12:00:00Z'
ORDER BY "id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."probe_reading"
WHERE "observed_at" IS NOT DISTINCT FROM '2025-02-10T12:00:00Z'
ORDER BY "id"
LIMIT 20;

-- Count probe_reading records for each station_id (up to 20 groups).
SELECT "station_id", count(*) AS record_count
FROM portfolio."probe_reading"
GROUP BY "station_id"
ORDER BY record_count DESC, "station_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "station_id", count(*) AS record_count
FROM portfolio."probe_reading"
GROUP BY "station_id"
ORDER BY record_count DESC, "station_id" NULLS LAST
LIMIT 20;
