# Uplink Probe Results — ER diagram

```mermaid
erDiagram
    direction LR
    probe_station {
        bigint id PK
        text station_code UK
        text region
        date installed_on
    }
    probe_reading {
        bigint id PK
        bigint station_id FK
        timestamptz observed_at
        numeric signal_dbm
        text status
    }
    probe_station ||--o{ probe_reading : "station_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Olorunlogbon_Rilwan_301908277_ERDiagram.png)
