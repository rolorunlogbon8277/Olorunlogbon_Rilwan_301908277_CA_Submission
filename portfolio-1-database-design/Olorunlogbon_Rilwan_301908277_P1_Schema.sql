-- Uplink Probe Results: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."probe_station" (
  "id" bigint NOT NULL,
  "station_code" text NOT NULL,
  "region" text NOT NULL,
  "installed_on" date NOT NULL,
  CONSTRAINT "pk_probe_station" PRIMARY KEY ("id"),
  CONSTRAINT "uq_probe_station_0" UNIQUE ("station_code")
);
CREATE TABLE portfolio."probe_reading" (
  "id" bigint NOT NULL,
  "station_id" bigint NOT NULL,
  "observed_at" timestamptz NOT NULL,
  "signal_dbm" numeric(18,2) NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_probe_reading" PRIMARY KEY ("id")
);
ALTER TABLE portfolio."probe_reading" ADD CONSTRAINT "fk_probe_reading_0" FOREIGN KEY ("station_id") REFERENCES portfolio."probe_station" ("id");
ALTER TABLE portfolio."probe_reading" ADD CONSTRAINT "signal_range" CHECK (("signal_dbm" >= -150) AND ("signal_dbm" <= 0));
CREATE UNIQUE INDEX "unique_alert_reading" ON portfolio."probe_reading" ("station_id", "observed_at") WHERE ("status" = 'alert');
COMMIT;
