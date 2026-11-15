// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("probe_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("probe_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "probe_recorded",
                    "signal_threshold_crossed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "probe_reading"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("probe_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "probe_recorded",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "probe_reading",
            "key": {
                "id": 2001
            },
            "snapshot": {
                "id": 2001,
                "station_id": 1001,
                "observed_at": "2025-02-10T12:00:00Z",
                "signal_dbm": -75.5,
                "status": "alert"
            }
        },
        "embedded": {
            "probe_station": [
                {
                    "key": {
                        "id": 1001
                    },
                    "snapshot": {
                        "id": 1001,
                        "station_code": "STN-NORTH-01",
                        "region": "north",
                        "installed_on": "2024-01-15"
                    },
                    "via": [
                        "probe_reading.station_id → probe_station"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "signal_threshold_crossed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "probe_reading",
            "key": {
                "id": 2001
            },
            "snapshot": {
                "id": 2001,
                "station_id": 1001,
                "observed_at": "2025-02-10T12:00:00Z",
                "signal_dbm": -75.5,
                "status": "alert"
            }
        },
        "embedded": {
            "probe_station": [
                {
                    "key": {
                        "id": 1001
                    },
                    "snapshot": {
                        "id": 1001,
                        "station_code": "STN-NORTH-01",
                        "region": "north",
                        "installed_on": "2024-01-15"
                    },
                    "via": [
                        "probe_reading.station_id → probe_station"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "diagnostic_tags": "illustrative diagnostic_tags",
                "measurement_context": "illustrative measurement_context"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "probe_recorded",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "probe_reading",
            "key": {
                "id": 2002
            },
            "snapshot": {
                "id": 2002,
                "station_id": 1002,
                "observed_at": "2025-02-10T12:05:00Z",
                "signal_dbm": -88,
                "status": "normal"
            }
        },
        "embedded": {
            "probe_station": [
                {
                    "key": {
                        "id": 1002
                    },
                    "snapshot": {
                        "id": 1002,
                        "station_code": "STN-SOUTH-01",
                        "region": "south",
                        "installed_on": "2024-03-20"
                    },
                    "via": [
                        "probe_reading.station_id → probe_station"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "signal_threshold_crossed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "probe_reading",
            "key": {
                "id": 2002
            },
            "snapshot": {
                "id": 2002,
                "station_id": 1002,
                "observed_at": "2025-02-10T12:05:00Z",
                "signal_dbm": -88,
                "status": "normal"
            }
        },
        "embedded": {
            "probe_station": [
                {
                    "key": {
                        "id": 1002
                    },
                    "snapshot": {
                        "id": 1002,
                        "station_code": "STN-SOUTH-01",
                        "region": "south",
                        "installed_on": "2024-03-20"
                    },
                    "via": [
                        "probe_reading.station_id → probe_station"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "diagnostic_tags": "illustrative diagnostic_tags",
                "measurement_context": "illustrative measurement_context"
            }
        }
    }
]));
  await db.getCollection("probe_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("probe_events").find({"eventType":"probe_recorded"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("probe_events").find({"source.key.id":2001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("probe_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("probe_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("probe_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "probe_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "probe_reading",
        "key": {
            "id": 2001
        },
        "snapshot": {
            "id": 2001,
            "station_id": 1001,
            "observed_at": "2025-02-10T12:00:00Z",
            "signal_dbm": -75.5,
            "status": "alert"
        }
    },
    "embedded": {
        "probe_station": [
            {
                "key": {
                    "id": 1001
                },
                "snapshot": {
                    "id": 1001,
                    "station_code": "STN-NORTH-01",
                    "region": "north",
                    "installed_on": "2024-01-15"
                },
                "via": [
                    "probe_reading.station_id → probe_station"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("probe_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "probe_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "probe_reading",
        "key": {
            "id": 2001
        },
        "snapshot": {
            "id": 2001,
            "station_id": 1001,
            "observed_at": "2025-02-10T12:00:00Z",
            "signal_dbm": -75.5,
            "status": "alert"
        }
    },
    "embedded": {
        "probe_station": [
            {
                "key": {
                    "id": 1001
                },
                "snapshot": {
                    "id": 1001,
                    "station_code": "STN-NORTH-01",
                    "region": "north",
                    "installed_on": "2024-01-15"
                },
                "via": [
                    "probe_reading.station_id → probe_station"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("probe_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
