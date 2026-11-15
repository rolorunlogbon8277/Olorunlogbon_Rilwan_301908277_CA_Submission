-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. station primary key. Expected: pk_probe_station, SQLSTATE 23505.
INSERT INTO portfolio."probe_station" ("id", "station_code", "region", "installed_on")
VALUES (1001, 'STN-TEST-PK', 'east', '2025-01-01');

-- 2. station unique code. Expected: uq_probe_station_0, SQLSTATE 23505.
INSERT INTO portfolio."probe_station" ("id", "station_code", "region", "installed_on")
VALUES (3001, 'STN-NORTH-01', 'east', '2025-01-01');

-- 3. station not null. Expected: station_code, SQLSTATE 23502.
INSERT INTO portfolio."probe_station" ("id", "station_code", "region", "installed_on")
VALUES (3002, NULL, 'east', '2025-01-01');

-- 4. reading primary key. Expected: pk_probe_reading, SQLSTATE 23505.
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status")
VALUES (2001, 1002, '2025-02-10T12:10:00Z', -80, 'normal');

-- 5. reading foreign key. Expected: fk_probe_reading_0, SQLSTATE 23503.
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status")
VALUES (3003, 9999, '2025-02-10T12:10:00Z', -80, 'normal');

-- 6. reading signal range. Expected: signal_range, SQLSTATE 23514.
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status")
VALUES (3004, 1002, '2025-02-10T12:15:00Z', -151, 'normal');

-- 7. reading partial unique alert. Expected: unique_alert_reading, SQLSTATE 23505.
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status")
VALUES (3005, 1001, '2025-02-10T12:00:00Z', -70, 'alert');
