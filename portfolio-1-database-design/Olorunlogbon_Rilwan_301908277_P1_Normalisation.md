# Uplink Probe Results — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| station_id | probe_reading records (list) |
| --- | --- |
| 1001 | [2001] |
| 1002 | [2002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| probe_reading.id | probe_reading.station_id | probe_reading.status | probe_station.id | probe_station.station_code |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | alert | 1001 | STN-NORTH-01 |
| 2002 | 1002 | normal | 1002 | STN-SOUTH-01 |

Key: id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## probe_reading_example

| probe_reading.id | probe_reading.station_id | probe_reading.status | probe_station.id | probe_station.station_code |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | alert | 1001 | STN-NORTH-01 |
| 2002 | 1002 | normal | 1002 | STN-SOUTH-01 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## probe_station

| id | station_code | region | installed_on |
| --- | --- | --- | --- |
| 1001 | STN-NORTH-01 | north | 2024-01-15 |
| 1002 | STN-SOUTH-01 | south | 2024-03-20 |

## probe_reading

| id | station_id | observed_at | signal_dbm | status |
| --- | --- | --- | --- | --- |
| 2001 | 1001 | 2025-02-10T12:00:00+00:00 | -75.5 | alert |
| 2002 | 1002 | 2025-02-10T12:05:00+00:00 | -88 | normal |

## Dependencies

- probe_station: (id) → station_code, region, installed_on
- probe_reading: (id) → station_id, observed_at, signal_dbm, status

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
