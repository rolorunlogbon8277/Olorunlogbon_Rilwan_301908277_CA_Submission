# Uplink Probe Results — SQL queries

## 1. Show related probe_reading, probe_station records (up to 20).

```sql
SELECT t0."id" AS "probe_reading_id",
       t0."observed_at" AS "probe_reading_observed_at",
       t1."id" AS "probe_station_id",
       t1."station_code" AS "probe_station_station_code"
FROM portfolio."probe_reading" t0
JOIN portfolio."probe_station" t1 ON t0."station_id" = t1."id"
ORDER BY t0."id", t1."id"
LIMIT 20;
```

| probe_reading_id | probe_reading_observed_at | probe_station_id | probe_station_station_code |
| --- | --- | --- | --- |
| 2001 | 2025-02-10T12:00:00+00:00 | 1001 | STN-NORTH-01 |
| 2002 | 2025-02-10T12:05:00+00:00 | 1002 | STN-SOUTH-01 |

## 2. Find probe_reading records where observed_at matches "2025-02-10T12:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."probe_reading"
WHERE "observed_at" IS NOT DISTINCT FROM '2025-02-10T12:00:00Z'
ORDER BY "id"
LIMIT 20;
```

| id | station_id | observed_at | signal_dbm | status |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | 2025-02-10T12:00:00+00:00 | -75.5 | alert |

## 3. Count probe_reading records for each station_id (up to 20 groups).

```sql
SELECT "station_id", count(*) AS record_count
FROM portfolio."probe_reading"
GROUP BY "station_id"
ORDER BY record_count DESC, "station_id" NULLS LAST
LIMIT 20;
```

| station_id | record_count |
| --- | --- |
| 1001 | 1 |
| 1002 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.978 | 0.978, 0.977, 0.979 | Sort → Seq Scan | 112 |
| After index | 0.178 | 0.178, 0.179, 0.178 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 0.978 ms to 0.178 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.954..0.956 rows=20 loops=1)
  Seq Scan on probe_reading (actual time=0.015..0.921 rows=20 loops=1)
Planning Time: 0.349 ms
Execution Time: 0.978 ms
```

### Before index, run 2

```text
Sort (actual time=0.952..0.954 rows=20 loops=1)
  Seq Scan on probe_reading (actual time=0.014..0.918 rows=20 loops=1)
Planning Time: 0.33 ms
Execution Time: 0.977 ms
```

### Before index, run 3

```text
Sort (actual time=0.953..0.955 rows=20 loops=1)
  Seq Scan on probe_reading (actual time=0.014..0.919 rows=20 loops=1)
Planning Time: 0.336 ms
Execution Time: 0.979 ms
```

### After index, run 1

```text
Sort (actual time=0.127..0.128 rows=20 loops=1)
  Bitmap Heap Scan on probe_reading (actual time=0.029..0.093 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=20 loops=1)
Planning Time: 0.519 ms
Execution Time: 0.178 ms
```

### After index, run 2

```text
Sort (actual time=0.127..0.129 rows=20 loops=1)
  Bitmap Heap Scan on probe_reading (actual time=0.025..0.091 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=20 loops=1)
Planning Time: 0.558 ms
Execution Time: 0.179 ms
```

### After index, run 3

```text
Sort (actual time=0.126..0.127 rows=20 loops=1)
  Bitmap Heap Scan on probe_reading (actual time=0.026..0.091 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=20 loops=1)
Planning Time: 0.551 ms
Execution Time: 0.178 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Olorunlogbon_Rilwan_301908277_P2_Queries.sql, then Olorunlogbon_Rilwan_301908277_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Olorunlogbon_Rilwan_301908277_P2_QueryResults.png) · [Index comparison](screenshots/Olorunlogbon_Rilwan_301908277_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

