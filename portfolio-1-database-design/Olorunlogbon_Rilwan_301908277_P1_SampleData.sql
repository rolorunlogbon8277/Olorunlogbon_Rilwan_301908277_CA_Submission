-- Fictional sample records for Uplink Probe Results.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."probe_station" ("id", "station_code", "region", "installed_on") VALUES (1001, 'STN-NORTH-01', 'north', '2024-01-15');
INSERT INTO portfolio."probe_station" ("id", "station_code", "region", "installed_on") VALUES (1002, 'STN-SOUTH-01', 'south', '2024-03-20');
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status") VALUES (2001, 1001, '2025-02-10T12:00:00Z', -75.5, 'alert');
INSERT INTO portfolio."probe_reading" ("id", "station_id", "observed_at", "signal_dbm", "status") VALUES (2002, 1002, '2025-02-10T12:05:00Z', -88, 'normal');
COMMIT;
