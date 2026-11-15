# Uplink Probe Results — database design

My case study records probe_station, probe_reading.

## Users

- Network operators reviewing probe measurements
- Analysts comparing signal levels across station regions

## Main operations

- Record a probe measurement for a station
- Filter measurements by region and observation time
- Compare measurement counts and average signal levels by region

## Entities

| Entity | Information stored |
| --- | --- |
| probe_station | Identifies a station that reports uplink probe measurements. |
| probe_reading | Stores a synthetic uplink signal measurement reported by one station. For a simple normalization example, use this foreign-key-bearing entity as the root: keep station_code and region in probe_station and reference that station here, rather than repeating station details for every reading. |

## probe_station

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| id | BIGINT | PK | Yes |
| station_code | TEXT | Unique | Yes |
| region | TEXT |  | Yes |
| installed_on | DATE |  | Yes |
- Unique key: (station_code).

## probe_reading

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| id | BIGINT | PK | Yes |
| station_id | BIGINT | FK | Yes |
| observed_at | TIMESTAMPTZ |  | Yes |
| signal_dbm | NUMERIC(18,2) |  | Yes |
| status | TEXT |  | Yes |
- station_id → probe_station.id

## Relationships and business rules

- Each station code identifies at most one station.
- Every reading must reference an existing station through station_id.
- A recorded signal level must be between -150 and 0 dBm, inclusive.
- For a station and observation time, at most one reading may have alert status; non-alert readings are not restricted by this rule.

## Assumptions

- All records and measurements are synthetic; no student names or IDs are used.
- Identifiers are generated to be globally unique across both entities.
- Observation timestamps are stored in UTC.
- A reading with status alert represents a threshold-crossing observation.
- Each reading belongs to exactly one station.

