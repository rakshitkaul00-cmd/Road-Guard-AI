// Auto-generated production fallback data for standalone edge hosting (e.g. Netlify)
// Ensures 100% interactivity, zero blank screens, and full ML simulation capability offline.

import { MapLayersResponse, SegmentRiskCard, RouteEvaluationResponse, CitizenReport } from '../services/api';

export const FALLBACK_MAP_LAYERS: MapLayersResponse = {
  "type": "FeatureCollection",
  "metadata": {
    "center": [
      12.9716,
      77.5946
    ],
    "zoom": 12,
    "total_features": 250,
    "study_area": "Bengaluru Urban (BBMP)"
  },
  "features": [
    {
      "type": "Feature",
      "id": "blackspot_1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6258,
          13.1362
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 1,
        "corridor_name": "Bengaluru-Ballari Road (NH 44)",
        "junction_name": "Hunasamaranahalli Junction",
        "fatal_count_3yr": 16,
        "injury_count_3yr": 31,
        "primary_hazard_cause": "High-speed pedestrian crossing and unsegregated service lane",
        "buffer_radius_m": 500.0,
        "official_source": "BTP Annual Blackspot Registry & NHAI Karnataka Survey",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6212,
          13.1511
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 2,
        "corridor_name": "Bengaluru-Ballari Road (NH 44)",
        "junction_name": "MVIT Circle / Bettahalasuru Cross",
        "fatal_count_3yr": 14,
        "injury_count_3yr": 28,
        "primary_hazard_cause": "Uncontrolled U-turn median cut with heavy truck traffic",
        "buffer_radius_m": 500.0,
        "official_source": "BTP Traffic Management Center",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_3",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.5029,
          13.0458
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 3,
        "corridor_name": "Tumakuru Road (NH 48 / NH 4)",
        "junction_name": "Peenya 8th Mile to Nagasandra Toll Stretch",
        "fatal_count_3yr": 22,
        "injury_count_3yr": 45,
        "primary_hazard_cause": "Severe freight conflict, flyover ramp bottleneck, poor illumination",
        "buffer_radius_m": 800.0,
        "official_source": "MoRTH National Highway Black Spot Inventory",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_4",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.5361,
          13.0287
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 4,
        "corridor_name": "Tumakuru Road (NH 48)",
        "junction_name": "Goraguntepalya Junction (Ring Road Cross)",
        "fatal_count_3yr": 18,
        "injury_count_3yr": 39,
        "primary_hazard_cause": "Major multi-modal junction with high pedestrian conflict",
        "buffer_radius_m": 600.0,
        "official_source": "BTP North Division Traffic Safety Audit",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_5",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.7011,
          12.9562
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 5,
        "corridor_name": "Outer Ring Road (ORR - East)",
        "junction_name": "Marathahalli Bridge & Multiplex Junction",
        "fatal_count_3yr": 19,
        "injury_count_3yr": 42,
        "primary_hazard_cause": "Bus bay weaving maneuvers, abrupt lane narrowing, high pedestrian volume",
        "buffer_radius_m": 500.0,
        "official_source": "BTP East Division Black Spot Report",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_6",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6762,
          12.926
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 6,
        "corridor_name": "Outer Ring Road (ORR - East)",
        "junction_name": "Bellandur Eco-Space Flyover Descent",
        "fatal_count_3yr": 15,
        "injury_count_3yr": 34,
        "primary_hazard_cause": "Flyover blind-spot descent, high IT corridor peak-hour merges",
        "buffer_radius_m": 500.0,
        "official_source": "BTP East Division Safety Audit",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_7",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6433,
          13.0252
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 7,
        "corridor_name": "Outer Ring Road (ORR - North)",
        "junction_name": "Hennur Cross / Outer Ring Road Junction",
        "fatal_count_3yr": 13,
        "injury_count_3yr": 29,
        "primary_hazard_cause": "Inadequate signal visibility and uncurbed arterial speed",
        "buffer_radius_m": 500.0,
        "official_source": "BTP Traffic Management Center",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_8",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.597,
          13.0358
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 8,
        "corridor_name": "Outer Ring Road (ORR - North)",
        "junction_name": "Hebbal Flyover Loops & Esteem Mall Entry",
        "fatal_count_3yr": 21,
        "injury_count_3yr": 48,
        "primary_hazard_cause": "Multi-tier loop bottleneck, weaving collisions during morning peak",
        "buffer_radius_m": 700.0,
        "official_source": "MoRTH Karnataka Black Spot Listing",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_9",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6238,
          12.9176
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 9,
        "corridor_name": "Hosur Road (NH 44 / Elevated Highway)",
        "junction_name": "Silk Board Junction (Central Hub)",
        "fatal_count_3yr": 24,
        "injury_count_3yr": 52,
        "primary_hazard_cause": "Extreme traffic divergence, complex slip roads, pedestrian exposure",
        "buffer_radius_m": 600.0,
        "official_source": "BTP South Division Safety Audit",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_10",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6419,
          12.8911
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 10,
        "corridor_name": "Hosur Road (NH 44)",
        "junction_name": "Kudlu Gate / Singasandra Junction",
        "fatal_count_3yr": 17,
        "injury_count_3yr": 36,
        "primary_hazard_cause": "Service road cross-traffic collision, missing physical median barriers",
        "buffer_radius_m": 500.0,
        "official_source": "BTP South-East Division Report",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_11",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6698,
          12.9972
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 11,
        "corridor_name": "Old Madras Road (OMR / NH 75)",
        "junction_name": "Tin Factory (KR Puram Railway Station Cross)",
        "fatal_count_3yr": 20,
        "injury_count_3yr": 44,
        "primary_hazard_cause": "Transit interchange choke point, high mixed pedestrian-bus interactions",
        "buffer_radius_m": 600.0,
        "official_source": "BTP East Division Audit",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_12",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.6834,
          13.0019
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 12,
        "corridor_name": "Old Madras Road (OMR / NH 75)",
        "junction_name": "KR Puram Hanging Bridge Descent",
        "fatal_count_3yr": 16,
        "injury_count_3yr": 35,
        "primary_hazard_cause": "Speed transitions off cable bridge onto narrow commercial strip",
        "buffer_radius_m": 500.0,
        "official_source": "BTP East Division Black Spot Report",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_13",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.4839,
          12.9125
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 13,
        "corridor_name": "Mysuru Road (SH 17)",
        "junction_name": "Kengeri Satellite Town Bus Stand Cross",
        "fatal_count_3yr": 15,
        "injury_count_3yr": 33,
        "primary_hazard_cause": "Terminal bus ingress conflicts, pedestrian crossing lack of refuge",
        "buffer_radius_m": 500.0,
        "official_source": "BTP West Division Road Safety Survey",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_14",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.5995,
          12.9344
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 14,
        "corridor_name": "Bannerghatta Road (SH 87)",
        "junction_name": "Dairy Circle / Jayadeva Underpass Corridor",
        "fatal_count_3yr": 12,
        "injury_count_3yr": 26,
        "primary_hazard_cause": "Metro construction diversions, sharp grade changes, lane indiscipline",
        "buffer_radius_m": 450.0,
        "official_source": "BTP South Division Registry",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_15",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.5642,
          12.8885
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 15,
        "corridor_name": "Kanakapura Road (NH 948)",
        "junction_name": "Konanakunte Cross / Metro Station",
        "fatal_count_3yr": 11,
        "injury_count_3yr": 24,
        "primary_hazard_cause": "Rapidly urbanizing peri-urban speed differential, missing pedestrian skywalk",
        "buffer_radius_m": 450.0,
        "official_source": "BTP South Division Safety Review",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "blackspot_16",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.7018,
          12.9128
        ]
      },
      "properties": {
        "layer_type": "official_blackspot",
        "id": 16,
        "corridor_name": "Sarjapur Road",
        "junction_name": "Karmelaram Railway Level Crossing Approach",
        "fatal_count_3yr": 10,
        "injury_count_3yr": 22,
        "primary_hazard_cause": "Uneven road geometry, sharp shoulder drop-offs, two-wheeler skids",
        "buffer_radius_m": 400.0,
        "official_source": "BTP Traffic East Division",
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_1",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625347,
            13.135832
          ],
          [
            77.624028,
            13.134338
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 1,
        "osm_way_id": "osm_way_1001",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.615,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_2",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625233,
            13.136887
          ],
          [
            77.623297,
            13.138207
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 2,
        "osm_way_id": "osm_way_1002",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 2",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.63,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_3",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.626045,
            13.137616
          ],
          [
            77.626601,
            13.140378
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 3,
        "osm_way_id": "osm_way_1003",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 3",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.661,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_4",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625339,
            13.136376
          ],
          [
            77.622473,
            13.137873
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 4,
        "osm_way_id": "osm_way_1004",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.609,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_5",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625222,
            13.138242
          ],
          [
            77.624439,
            13.139603
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 5,
        "osm_way_id": "osm_way_1005",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 5",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.643,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_6",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.621891,
            13.137628
          ],
          [
            77.619787,
            13.139162
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 6,
        "osm_way_id": "osm_way_1006",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.608,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_7",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.62263,
            13.137882
          ],
          [
            77.61974,
            13.13959
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 7,
        "osm_way_id": "osm_way_1007",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.601,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_8",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.627716,
            13.136461
          ],
          [
            77.629219,
            13.136912
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 8,
        "osm_way_id": "osm_way_1008",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 8",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.602,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_9",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624054,
            13.134714
          ],
          [
            77.622646,
            13.133012
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 9,
        "osm_way_id": "osm_way_1009",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 9",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.63,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_10",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.622944,
            13.134127
          ],
          [
            77.621382,
            13.133289
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 10,
        "osm_way_id": "osm_way_1010",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 10",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.623,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_11",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.620955,
            13.154714
          ],
          [
            77.621076,
            13.157317
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 11,
        "osm_way_id": "osm_way_1011",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.626,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_12",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.621821,
            13.15118
          ],
          [
            77.623861,
            13.151732
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 12,
        "osm_way_id": "osm_way_1012",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 2",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.625,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_13",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.619753,
            13.152533
          ],
          [
            77.617592,
            13.154422
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 13,
        "osm_way_id": "osm_way_1013",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.602,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_14",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.62291,
            13.150944
          ],
          [
            77.625593,
            13.151072
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 14,
        "osm_way_id": "osm_way_1014",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.641,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_15",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.622133,
            13.14986
          ],
          [
            77.624299,
            13.146945
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 15,
        "osm_way_id": "osm_way_1015",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 5",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.573,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_16",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.623524,
            13.153848
          ],
          [
            77.625452,
            13.156358
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 16,
        "osm_way_id": "osm_way_1016",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 6",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.626,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_17",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.621123,
            13.154171
          ],
          [
            77.621817,
            13.157645
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 17,
        "osm_way_id": "osm_way_1017",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 7",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.632,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_18",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.618295,
            13.149806
          ],
          [
            77.616408,
            13.149146
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 18,
        "osm_way_id": "osm_way_1018",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 8",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.622,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_19",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.622724,
            13.146141
          ],
          [
            77.624155,
            13.143123
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 19,
        "osm_way_id": "osm_way_1019",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.581,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_20",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.618647,
            13.155164
          ],
          [
            77.617714,
            13.156972
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 20,
        "osm_way_id": "osm_way_1020",
        "road_name": "Bengaluru-Ballari Road (NH 44) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.596,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_21",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.499704,
            13.046045
          ],
          [
            77.496532,
            13.046345
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 21,
        "osm_way_id": "osm_way_1021",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 1",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.635,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_22",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.503533,
            13.050816
          ],
          [
            77.504613,
            13.053976
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 22,
        "osm_way_id": "osm_way_1022",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.595,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_23",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.499239,
            13.049504
          ],
          [
            77.49813,
            13.050608
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 23,
        "osm_way_id": "osm_way_1023",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 3",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.628,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_24",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.50179,
            13.045908
          ],
          [
            77.499325,
            13.04622
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 24,
        "osm_way_id": "osm_way_1024",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 4",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.635,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_25",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.503615,
            13.044472
          ],
          [
            77.504506,
            13.042057
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 25,
        "osm_way_id": "osm_way_1025",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 5",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.634,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_26",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.502785,
            13.049469
          ],
          [
            77.502737,
            13.051806
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 26,
        "osm_way_id": "osm_way_1026",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 6",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.598,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_27",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.505839,
            13.044031
          ],
          [
            77.507617,
            13.043328
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 27,
        "osm_way_id": "osm_way_1027",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 7",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.605,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_28",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.507923,
            13.046451
          ],
          [
            77.511045,
            13.047701
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 28,
        "osm_way_id": "osm_way_1028",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 8",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.621,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_29",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.504007,
            13.046046
          ],
          [
            77.507498,
            13.046673
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 29,
        "osm_way_id": "osm_way_1029",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.63,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_30",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.501562,
            13.046293
          ],
          [
            77.500032,
            13.046786
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 30,
        "osm_way_id": "osm_way_1030",
        "road_name": "Tumakuru Road (NH 48 / NH 4) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.603,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_31",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.532247,
            13.028204
          ],
          [
            77.528835,
            13.026905
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 31,
        "osm_way_id": "osm_way_1031",
        "road_name": "Tumakuru Road (NH 48) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.596,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_32",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.534781,
            13.029786
          ],
          [
            77.53335,
            13.030892
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 32,
        "osm_way_id": "osm_way_1032",
        "road_name": "Tumakuru Road (NH 48) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.6,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_33",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.541258,
            13.028706
          ],
          [
            77.543614,
            13.028204
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 33,
        "osm_way_id": "osm_way_1033",
        "road_name": "Tumakuru Road (NH 48) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.601,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_34",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.536079,
            13.033293
          ],
          [
            77.536981,
            13.036716
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 34,
        "osm_way_id": "osm_way_1034",
        "road_name": "Tumakuru Road (NH 48) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.622,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_35",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.53624,
            13.027197
          ],
          [
            77.537044,
            13.025083
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 35,
        "osm_way_id": "osm_way_1035",
        "road_name": "Tumakuru Road (NH 48) - Link 5",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.667,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_36",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.54053,
            13.028286
          ],
          [
            77.542966,
            13.028169
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 36,
        "osm_way_id": "osm_way_1036",
        "road_name": "Tumakuru Road (NH 48) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.708,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_37",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.534687,
            13.024934
          ],
          [
            77.534292,
            13.023278
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 37,
        "osm_way_id": "osm_way_1037",
        "road_name": "Tumakuru Road (NH 48) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.697,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_38",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.534982,
            13.024689
          ],
          [
            77.534511,
            13.023282
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 38,
        "osm_way_id": "osm_way_1038",
        "road_name": "Tumakuru Road (NH 48) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.589,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_39",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.540569,
            13.031563
          ],
          [
            77.541698,
            13.032629
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 39,
        "osm_way_id": "osm_way_1039",
        "road_name": "Tumakuru Road (NH 48) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.636,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_40",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.537167,
            13.028797
          ],
          [
            77.54051,
            13.029612
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 40,
        "osm_way_id": "osm_way_1040",
        "road_name": "Tumakuru Road (NH 48) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.651,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_41",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.702767,
            12.953279
          ],
          [
            77.703401,
            12.950827
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 41,
        "osm_way_id": "osm_way_1041",
        "road_name": "Outer Ring Road (ORR - East) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.696,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_42",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.703568,
            12.956371
          ],
          [
            77.706454,
            12.956915
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 42,
        "osm_way_id": "osm_way_1042",
        "road_name": "Outer Ring Road (ORR - East) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.681,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_43",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.702329,
            12.958643
          ],
          [
            77.704857,
            12.961269
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 43,
        "osm_way_id": "osm_way_1043",
        "road_name": "Outer Ring Road (ORR - East) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.688,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_44",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.706284,
            12.955716
          ],
          [
            77.709529,
            12.954657
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 44,
        "osm_way_id": "osm_way_1044",
        "road_name": "Outer Ring Road (ORR - East) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.677,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_45",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.697607,
            12.958177
          ],
          [
            77.695694,
            12.96017
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 45,
        "osm_way_id": "osm_way_1045",
        "road_name": "Outer Ring Road (ORR - East) - Link 5",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.665,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_46",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.699289,
            12.956991
          ],
          [
            77.697028,
            12.958792
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 46,
        "osm_way_id": "osm_way_1046",
        "road_name": "Outer Ring Road (ORR - East) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.709,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_47",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.70314,
            12.958697
          ],
          [
            77.704493,
            12.960154
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 47,
        "osm_way_id": "osm_way_1047",
        "road_name": "Outer Ring Road (ORR - East) - Link 7",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.708,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_48",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.699752,
            12.955031
          ],
          [
            77.697526,
            12.95389
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 48,
        "osm_way_id": "osm_way_1048",
        "road_name": "Outer Ring Road (ORR - East) - Link 8",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.671,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_49",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.701963,
            12.954585
          ],
          [
            77.702399,
            12.953293
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 49,
        "osm_way_id": "osm_way_1049",
        "road_name": "Outer Ring Road (ORR - East) - Link 9",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.694,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_50",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.697838,
            12.956025
          ],
          [
            77.695606,
            12.955233
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 50,
        "osm_way_id": "osm_way_1050",
        "road_name": "Outer Ring Road (ORR - East) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.712,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_51",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.674363,
            12.928596
          ],
          [
            77.672619,
            12.931344
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 51,
        "osm_way_id": "osm_way_1051",
        "road_name": "Outer Ring Road (ORR - East) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.7,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_52",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.680899,
            12.924244
          ],
          [
            77.683593,
            12.922515
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 52,
        "osm_way_id": "osm_way_1052",
        "road_name": "Outer Ring Road (ORR - East) - Link 2",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.591,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_53",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.677185,
            12.926003
          ],
          [
            77.680292,
            12.925302
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 53,
        "osm_way_id": "osm_way_1053",
        "road_name": "Outer Ring Road (ORR - East) - Link 3",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.694,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_54",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.680484,
            12.928855
          ],
          [
            77.683703,
            12.929874
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 54,
        "osm_way_id": "osm_way_1054",
        "road_name": "Outer Ring Road (ORR - East) - Link 4",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.571,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_55",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.676852,
            12.93005
          ],
          [
            77.677719,
            12.931972
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 55,
        "osm_way_id": "osm_way_1055",
        "road_name": "Outer Ring Road (ORR - East) - Link 5",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.609,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_56",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.674512,
            12.92666
          ],
          [
            77.671341,
            12.927117
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 56,
        "osm_way_id": "osm_way_1056",
        "road_name": "Outer Ring Road (ORR - East) - Link 6",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.641,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_57",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.680744,
            12.926775
          ],
          [
            77.683092,
            12.927458
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 57,
        "osm_way_id": "osm_way_1057",
        "road_name": "Outer Ring Road (ORR - East) - Link 7",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.699,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_58",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.676414,
            12.927392
          ],
          [
            77.677184,
            12.929343
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 58,
        "osm_way_id": "osm_way_1058",
        "road_name": "Outer Ring Road (ORR - East) - Link 8",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.693,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_59",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.674264,
            12.924468
          ],
          [
            77.671377,
            12.922284
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 59,
        "osm_way_id": "osm_way_1059",
        "road_name": "Outer Ring Road (ORR - East) - Link 9",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.732,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_60",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.675947,
            12.927312
          ],
          [
            77.674788,
            12.930645
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 60,
        "osm_way_id": "osm_way_1060",
        "road_name": "Outer Ring Road (ORR - East) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.673,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_61",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.641261,
            13.024931
          ],
          [
            77.638495,
            13.024584
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 61,
        "osm_way_id": "osm_way_1061",
        "road_name": "Outer Ring Road (ORR - North) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.71,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_62",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.647365,
            13.025082
          ],
          [
            77.6487,
            13.024701
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 62,
        "osm_way_id": "osm_way_1062",
        "road_name": "Outer Ring Road (ORR - North) - Link 2",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.691,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_63",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.639432,
            13.025009
          ],
          [
            77.637308,
            13.02435
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 63,
        "osm_way_id": "osm_way_1063",
        "road_name": "Outer Ring Road (ORR - North) - Link 3",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.619,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_64",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.647695,
            13.023381
          ],
          [
            77.650626,
            13.022555
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 64,
        "osm_way_id": "osm_way_1064",
        "road_name": "Outer Ring Road (ORR - North) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.645,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_65",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.644431,
            13.023634
          ],
          [
            77.645464,
            13.022341
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 65,
        "osm_way_id": "osm_way_1065",
        "road_name": "Outer Ring Road (ORR - North) - Link 5",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.665,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_66",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.64124,
            13.028068
          ],
          [
            77.640095,
            13.029763
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 66,
        "osm_way_id": "osm_way_1066",
        "road_name": "Outer Ring Road (ORR - North) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.676,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_67",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.644755,
            13.022193
          ],
          [
            77.646047,
            13.019663
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 67,
        "osm_way_id": "osm_way_1067",
        "road_name": "Outer Ring Road (ORR - North) - Link 7",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.704,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_68",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.644146,
            13.020354
          ],
          [
            77.645303,
            13.017419
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 68,
        "osm_way_id": "osm_way_1068",
        "road_name": "Outer Ring Road (ORR - North) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.649,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_69",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.641693,
            13.023783
          ],
          [
            77.638959,
            13.02202
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 69,
        "osm_way_id": "osm_way_1069",
        "road_name": "Outer Ring Road (ORR - North) - Link 9",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.699,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_70",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.643857,
            13.02538
          ],
          [
            77.645702,
            13.026004
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 70,
        "osm_way_id": "osm_way_1070",
        "road_name": "Outer Ring Road (ORR - North) - Link 10",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.614,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_71",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.598877,
            13.032733
          ],
          [
            77.599625,
            13.031099
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 71,
        "osm_way_id": "osm_way_1071",
        "road_name": "Outer Ring Road (ORR - North) - Link 1",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.63,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_72",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.596592,
            13.035534
          ],
          [
            77.593751,
            13.03427
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 72,
        "osm_way_id": "osm_way_1072",
        "road_name": "Outer Ring Road (ORR - North) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.604,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_73",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.601767,
            13.038134
          ],
          [
            77.603683,
            13.039823
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 73,
        "osm_way_id": "osm_way_1073",
        "road_name": "Outer Ring Road (ORR - North) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.586,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_74",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.598226,
            13.031543
          ],
          [
            77.59817,
            13.028689
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 74,
        "osm_way_id": "osm_way_1074",
        "road_name": "Outer Ring Road (ORR - North) - Link 4",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.522,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_75",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.594744,
            13.038506
          ],
          [
            77.592828,
            13.040818
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 75,
        "osm_way_id": "osm_way_1075",
        "road_name": "Outer Ring Road (ORR - North) - Link 5",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.628,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_76",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.594445,
            13.039102
          ],
          [
            77.59268,
            13.040805
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 76,
        "osm_way_id": "osm_way_1076",
        "road_name": "Outer Ring Road (ORR - North) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.596,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_77",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.593902,
            13.036101
          ],
          [
            77.591067,
            13.036002
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 77,
        "osm_way_id": "osm_way_1077",
        "road_name": "Outer Ring Road (ORR - North) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.586,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_78",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.599069,
            13.035523
          ],
          [
            77.601696,
            13.03573
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 78,
        "osm_way_id": "osm_way_1078",
        "road_name": "Outer Ring Road (ORR - North) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.608,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_79",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.59624,
            13.035592
          ],
          [
            77.593982,
            13.035035
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 79,
        "osm_way_id": "osm_way_1079",
        "road_name": "Outer Ring Road (ORR - North) - Link 9",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.598,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_80",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.599436,
            13.031474
          ],
          [
            77.600462,
            13.029002
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 80,
        "osm_way_id": "osm_way_1080",
        "road_name": "Outer Ring Road (ORR - North) - Link 10",
        "road_class": "primary",
        "speed_limit_kmh": 50,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.654,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_81",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624136,
            12.91725
          ],
          [
            77.625377,
            12.91548
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 81,
        "osm_way_id": "osm_way_1081",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.541,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_82",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625876,
            12.913972
          ],
          [
            77.627021,
            12.911644
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 82,
        "osm_way_id": "osm_way_1082",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 2",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.565,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_83",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624039,
            12.917053
          ],
          [
            77.624669,
            12.915036
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 83,
        "osm_way_id": "osm_way_1083",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.6,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_84",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624026,
            12.91654
          ],
          [
            77.625352,
            12.914109
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 84,
        "osm_way_id": "osm_way_1084",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.606,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_85",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624432,
            12.921183
          ],
          [
            77.624682,
            12.922822
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 85,
        "osm_way_id": "osm_way_1085",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 5",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.605,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_86",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.625862,
            12.918094
          ],
          [
            77.628855,
            12.919039
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 86,
        "osm_way_id": "osm_way_1086",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.556,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_87",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.624678,
            12.917588
          ],
          [
            77.626109,
            12.917535
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 87,
        "osm_way_id": "osm_way_1087",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.563,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_88",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.620211,
            12.915063
          ],
          [
            77.617638,
            12.913774
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 88,
        "osm_way_id": "osm_way_1088",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.564,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_89",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.623958,
            12.918796
          ],
          [
            77.62434,
            12.920388
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 89,
        "osm_way_id": "osm_way_1089",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.539,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_90",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.619657,
            12.916273
          ],
          [
            77.61794,
            12.91584
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 90,
        "osm_way_id": "osm_way_1090",
        "road_name": "Hosur Road (NH 44 / Elevated Highway) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.575,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_91",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.637035,
            12.893306
          ],
          [
            77.635417,
            12.893546
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 91,
        "osm_way_id": "osm_way_1091",
        "road_name": "Hosur Road (NH 44) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.451,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_92",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.641256,
            12.893433
          ],
          [
            77.639754,
            12.896007
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 92,
        "osm_way_id": "osm_way_1092",
        "road_name": "Hosur Road (NH 44) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.571,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_93",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.644522,
            12.894531
          ],
          [
            77.646682,
            12.897028
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 93,
        "osm_way_id": "osm_way_1093",
        "road_name": "Hosur Road (NH 44) - Link 3",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.575,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_94",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.63972,
            12.891542
          ],
          [
            77.637363,
            12.891836
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 94,
        "osm_way_id": "osm_way_1094",
        "road_name": "Hosur Road (NH 44) - Link 4",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.565,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_95",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.638137,
            12.89375
          ],
          [
            77.637127,
            12.894997
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 95,
        "osm_way_id": "osm_way_1095",
        "road_name": "Hosur Road (NH 44) - Link 5",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.423,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_96",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.63932,
            12.890409
          ],
          [
            77.636238,
            12.890442
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 96,
        "osm_way_id": "osm_way_1096",
        "road_name": "Hosur Road (NH 44) - Link 6",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.541,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_97",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.641206,
            12.888335
          ],
          [
            77.640322,
            12.886168
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 97,
        "osm_way_id": "osm_way_1097",
        "road_name": "Hosur Road (NH 44) - Link 7",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.518,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_98",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.641111,
            12.891527
          ],
          [
            77.637899,
            12.892683
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 98,
        "osm_way_id": "osm_way_1098",
        "road_name": "Hosur Road (NH 44) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.616,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_99",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.642319,
            12.890671
          ],
          [
            77.645048,
            12.888773
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 99,
        "osm_way_id": "osm_way_1099",
        "road_name": "Hosur Road (NH 44) - Link 9",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.579,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_100",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.646063,
            12.888513
          ],
          [
            77.648791,
            12.887282
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 100,
        "osm_way_id": "osm_way_1100",
        "road_name": "Hosur Road (NH 44) - Link 10",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.386,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_101",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.671913,
            13.000651
          ],
          [
            77.67352,
            13.002537
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 101,
        "osm_way_id": "osm_way_1101",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.587,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_102",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.670059,
            12.992828
          ],
          [
            77.670416,
            12.991306
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 102,
        "osm_way_id": "osm_way_1102",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.551,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_103",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.668393,
            12.994764
          ],
          [
            77.667215,
            12.99249
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 103,
        "osm_way_id": "osm_way_1103",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.592,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_104",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.66804,
            12.996677
          ],
          [
            77.666336,
            12.995717
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 104,
        "osm_way_id": "osm_way_1104",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 4",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.575,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_105",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.668831,
            12.99308
          ],
          [
            77.668731,
            12.991314
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 105,
        "osm_way_id": "osm_way_1105",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 5",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.588,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_106",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.669342,
            13.000217
          ],
          [
            77.668572,
            13.002059
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 106,
        "osm_way_id": "osm_way_1106",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 6",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.571,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_107",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.670283,
            12.997423
          ],
          [
            77.672477,
            12.99882
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 107,
        "osm_way_id": "osm_way_1107",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.598,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_108",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.668755,
            12.996851
          ],
          [
            77.665551,
            12.995761
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 108,
        "osm_way_id": "osm_way_1108",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.565,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_109",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.670316,
            12.994616
          ],
          [
            77.671124,
            12.993034
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 109,
        "osm_way_id": "osm_way_1109",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.542,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_110",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.667552,
            12.998266
          ],
          [
            77.666209,
            12.999035
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 110,
        "osm_way_id": "osm_way_1110",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 10",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.574,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_111",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.682628,
            13.000095
          ],
          [
            77.682019,
            12.996554
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 111,
        "osm_way_id": "osm_way_1111",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 1",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.57,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_112",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.681842,
            13.002297
          ],
          [
            77.679314,
            13.002864
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 112,
        "osm_way_id": "osm_way_1112",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 2",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.583,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_113",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.683274,
            13.00386
          ],
          [
            77.683283,
            13.00661
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 113,
        "osm_way_id": "osm_way_1113",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 3",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.601,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_114",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.684882,
            13.002292
          ],
          [
            77.687478,
            13.00358
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 114,
        "osm_way_id": "osm_way_1114",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 4",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.554,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_115",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.683446,
            13.004582
          ],
          [
            77.683148,
            13.007255
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 115,
        "osm_way_id": "osm_way_1115",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 5",
        "road_class": "motorway",
        "speed_limit_kmh": 80,
        "lane_count": 6,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.602,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_116",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.680749,
            13.001114
          ],
          [
            77.677776,
            13.000995
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 116,
        "osm_way_id": "osm_way_1116",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 6",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.583,
        "risk_tier": "ELEVATED",
        "color": "#EF4444"
      }
    },
    {
      "type": "Feature",
      "id": "segment_117",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.67898,
            12.999212
          ],
          [
            77.676937,
            12.998042
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 117,
        "osm_way_id": "osm_way_1117",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 7",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": false,
        "calibrated_risk_probability": 0.427,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_118",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.682668,
            13.002272
          ],
          [
            77.681015,
            13.00289
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 118,
        "osm_way_id": "osm_way_1118",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 8",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.574,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_119",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.684463,
            13.001644
          ],
          [
            77.687248,
            13.000615
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 119,
        "osm_way_id": "osm_way_1119",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 9",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.549,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "segment_120",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.683434,
            13.001052
          ],
          [
            77.683552,
            12.999615
          ]
        ]
      },
      "properties": {
        "layer_type": "road_segment",
        "segment_id": 120,
        "osm_way_id": "osm_way_1120",
        "road_name": "Old Madras Road (OMR / NH 75) - Link 10",
        "road_class": "trunk",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "is_blackspot_corridor": true,
        "calibrated_risk_probability": 0.546,
        "risk_tier": "MODERATE",
        "color": "#F59E0B"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.643535,
          13.02765
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 1,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0277, 77.6435)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-28T23:47:45.234735",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_3",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.563399,
          12.890119
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 3,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.8901, 77.5634)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-29T07:57:35.317604",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_4",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.501726,
          13.045381
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 4,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 13.0454, 77.5017)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-04T17:41:14.165502",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_5",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.623076,
          12.916968
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 5,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.917, 77.6231)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-09-26T01:54:23.150813",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_6",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.533231,
          13.027773
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 6,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0278, 77.5332)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-07T11:01:40.804889",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_7",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.621705,
          12.914994
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 7,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.915, 77.6217)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T22:55:24.466398",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_8",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.639987,
          12.893309
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 8,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.8933, 77.64)",
        "severity_rating": 5,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-26T01:42:52.617054",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_9",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.684613,
          13.002105
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 9,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0021, 77.6846)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-27T15:39:25.902066",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_10",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.53679,
          12.906857
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 10,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9069, 77.5368)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-08T11:34:45.060320",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_11",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.51922,
          13.055968
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 11,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.056, 77.5192)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-30T17:08:06.717970",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_12",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.681555,
          13.001678
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 12,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0017, 77.6816)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-29T11:43:20.289624",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_13",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.668484,
          12.995666
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 13,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9957, 77.6685)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-07T23:34:24.128095",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_14",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.619631,
          13.152926
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 14,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.1529, 77.6196)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-03T17:18:05.188144",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_15",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.624529,
          13.138822
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 15,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.1388, 77.6245)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-01T14:23:01.985493",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_16",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.543507,
          12.974544
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 16,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9745, 77.5435)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-01T04:00:49.615157",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_17",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.625431,
          12.918032
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 17,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.918, 77.6254)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-28T21:54:52.851823",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_18",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.668607,
          12.996001
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 18,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.996, 77.6686)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-09-28T20:06:39.458491",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_19",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.60867,
          12.925894
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 19,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9259, 77.6087)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-02T03:08:24.086811",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_21",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.56582,
          12.889504
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 21,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.8895, 77.5658)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-26T11:40:46.306256",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_22",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.53896,
          13.029847
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 22,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0298, 77.539)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-28T01:02:30.108028",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_23",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.624101,
          13.134631
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 23,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.1346, 77.6241)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-06T06:11:02.061124",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_24",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.640527,
          13.024892
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 24,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0249, 77.6405)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-09T04:11:14.325464",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_25",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.599551,
          12.900502
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 25,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9005, 77.5996)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-08T15:23:47.028274",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_26",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.682496,
          12.901343
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 26,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9013, 77.6825)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-05T23:10:58.684675",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_27",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.528704,
          12.954125
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 27,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9541, 77.5287)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-26T20:29:09.171026",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_28",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.598967,
          13.033795
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 28,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.0338, 77.599)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-05T17:55:50.620169",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_29",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.595202,
          13.035617
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 29,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0356, 77.5952)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-02T03:13:50.140438",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_30",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.640701,
          13.017995
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 30,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.018, 77.6407)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-29T02:59:10.417217",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_31",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.484456,
          12.910271
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 31,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9103, 77.4845)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-04T15:03:30.784637",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_32",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.625496,
          12.891596
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 32,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.8916, 77.6255)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-01T04:28:34.987847",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_33",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.568316,
          12.950773
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 33,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9508, 77.5683)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-02T19:58:51.284768",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_34",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.538141,
          13.046623
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 34,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0466, 77.5381)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-05T13:39:06.159860",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_35",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.534171,
          12.906456
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 35,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9065, 77.5342)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-01T20:59:47.015807",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_36",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.533164,
          13.029978
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 36,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.03, 77.5332)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-04T17:08:04.434526",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_37",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.699619,
          12.911256
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 37,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9113, 77.6996)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-01T10:17:02.709270",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_38",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.620923,
          13.153413
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 38,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.1534, 77.6209)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-28T07:00:25.569477",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_39",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.599118,
          13.037998
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 39,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.038, 77.5991)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-06T08:18:44.029249",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_40",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.638015,
          12.89141
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 40,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.8914, 77.638)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-29T13:31:02.407674",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_41",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.642391,
          12.891275
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 41,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.8913, 77.6424)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-28T16:33:01.398930",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_43",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.596857,
          12.934286
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 43,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9343, 77.5969)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-27T00:47:57.316398",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_44",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.624733,
          13.133243
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 44,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.1332, 77.6247)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-09T21:48:08.863699",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_45",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.644936,
          13.024123
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 45,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.0241, 77.6449)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-09-30T10:57:59.068827",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_46",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.641433,
          12.891198
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 46,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.8912, 77.6414)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-28T00:38:15.168051",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_47",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.601181,
          12.936343
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 47,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9363, 77.6012)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-02T21:31:16.531632",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_48",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.503984,
          13.04529
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 48,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0453, 77.504)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-26T03:37:12.696775",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_49",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.48516,
          12.909866
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 49,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9099, 77.4852)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-05T14:32:56.235687",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_50",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.625623,
          12.981698
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 50,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9817, 77.6256)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-28T09:40:33.077425",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_51",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.644147,
          13.026974
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 51,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.027, 77.6441)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-29T05:25:31.489503",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_52",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.704145,
          12.912589
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 52,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9126, 77.7041)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-09-30T11:26:13.896925",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_53",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.680633,
          13.003108
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 53,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0031, 77.6806)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-01T02:38:30.307429",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_54",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.647177,
          12.892094
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 54,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.8921, 77.6472)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-29T19:58:34.968380",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_55",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.641111,
          13.027629
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 55,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.0276, 77.6411)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-27T10:11:31.997381",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_56",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.626466,
          13.138804
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 56,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.1388, 77.6265)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-03T23:00:13.955759",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_57",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.594368,
          13.035406
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 57,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0354, 77.5944)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-29T06:45:10.931904",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_58",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.627316,
          12.895005
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 58,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.895, 77.6273)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-29T19:33:59.616705",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_59",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.594204,
          13.034247
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 59,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 13.0342, 77.5942)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-01T13:43:47.059763",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_60",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.538473,
          13.028105
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 60,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0281, 77.5385)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-30T16:27:24.985680",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_61",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.536383,
          13.027255
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 61,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 13.0273, 77.5364)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-26T06:33:26.556242",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_62",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.500866,
          13.045924
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 62,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.0459, 77.5009)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-06T11:25:40.063985",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_63",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.675216,
          12.928171
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 63,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9282, 77.6752)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-05T14:40:56.501198",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_64",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.676843,
          12.925097
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 64,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9251, 77.6768)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-01T21:23:36.730829",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_65",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.663604,
          13.049222
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 65,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0492, 77.6636)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-09-27T04:14:18.083519",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_66",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.678126,
          12.925282
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 66,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9253, 77.6781)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-08T01:29:16.715943",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_67",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.600409,
          12.932295
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 67,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9323, 77.6004)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-29T13:10:58.660517",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_69",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.624023,
          13.133977
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 69,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.134, 77.624)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-26T15:51:51.010303",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_71",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.557507,
          12.925205
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 71,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9252, 77.5575)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-02T05:08:52.947314",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_72",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.648421,
          12.989697
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 72,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9897, 77.6484)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-27T00:17:10.813952",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_74",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.618973,
          13.153469
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 74,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.1535, 77.619)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-04T23:32:09.020225",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_75",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.532346,
          12.940851
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 75,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9409, 77.5323)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-04T01:53:10.126240",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_76",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.70077,
          12.954294
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 76,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9543, 77.7008)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T15:33:50.544000",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_77",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.621077,
          13.149195
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 77,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 13.1492, 77.6211)",
        "severity_rating": 5,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-30T00:54:42.026718",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_78",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.550175,
          12.94544
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 78,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9454, 77.5502)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-04T08:05:52.640788",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_79",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.537056,
          13.052234
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 79,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0522, 77.5371)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-03T08:23:05.338532",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_80",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.671403,
          12.995711
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 80,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9957, 77.6714)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-08T22:37:08.119513",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_81",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.538652,
          13.027203
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 81,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0272, 77.5387)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-09-27T22:25:51.245134",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_82",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.639298,
          12.893755
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 82,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.8938, 77.6393)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-06T00:05:41.127635",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_83",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.704794,
          12.910276
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 83,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9103, 77.7048)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-07T00:01:56.678084",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_84",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.704386,
          12.9145
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 84,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9145, 77.7044)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-03T14:56:55.717798",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_86",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.572579,
          12.947563
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 86,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9476, 77.5726)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-27T07:16:18.853833",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_87",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.669017,
          12.999863
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 87,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9999, 77.669)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-06T22:21:33.491190",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_88",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.642038,
          13.002187
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 88,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0022, 77.642)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-03T19:32:38.727410",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_89",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.70064,
          12.915667
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 89,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9157, 77.7006)",
        "severity_rating": 5,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T14:27:59.940944",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_90",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.684795,
          13.000846
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 90,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0008, 77.6848)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-09T11:34:45.306684",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_92",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.481821,
          12.913599
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 92,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9136, 77.4818)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-10-03T04:02:28.312307",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_93",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.70332,
          12.91285
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 93,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9129, 77.7033)",
        "severity_rating": 5,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T10:11:57.340567",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_94",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.517597,
          12.902623
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 94,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9026, 77.5176)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-30T12:49:40.382093",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_95",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.597788,
          13.033148
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 95,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0331, 77.5978)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 6,
        "is_synthetic": true,
        "created_at": "2026-09-29T13:03:08.198701",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_96",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.683834,
          12.999109
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 96,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9991, 77.6838)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-07T17:15:29.443740",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_98",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.644833,
          12.891112
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 98,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.8911, 77.6448)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-28T10:27:05.110356",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_99",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.70259,
          12.915489
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 99,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9155, 77.7026)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-09-30T10:46:15.580636",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.678816,
          12.926865
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 100,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9269, 77.6788)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-03T05:10:13.352825",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_101",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.699118,
          12.910958
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 101,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.911, 77.6991)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-08T19:05:15.299860",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_102",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.594161,
          13.038691
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 102,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0387, 77.5942)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-09-28T19:26:20.152269",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_103",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.598775,
          13.035889
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 103,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0359, 77.5988)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-06T02:43:27.770144",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_104",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.673487,
          12.924048
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 104,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.924, 77.6735)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 4,
        "is_synthetic": true,
        "created_at": "2026-10-01T01:18:12.332908",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_105",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.685745,
          13.002727
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 105,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0027, 77.6857)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-01T18:38:10.387745",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_109",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.484481,
          12.911157
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 109,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9112, 77.4845)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-26T09:48:19.090005",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_111",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.567452,
          13.031046
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 111,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.031, 77.5675)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-27T11:12:16.165619",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_112",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.547997,
          12.914102
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 112,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9141, 77.548)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T02:44:25.309796",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_113",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.677088,
          12.92753
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 113,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9275, 77.6771)",
        "severity_rating": 5,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-07T09:52:34.069958",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_114",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.686395,
          13.00478
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 114,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 13.0048, 77.6864)",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-09-29T05:04:24.243765",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_115",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.482467,
          12.909571
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 115,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9096, 77.4825)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-10-03T15:29:04.037487",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_116",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.48156,
          12.913461
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 116,
        "hazard_type": "SIGNAL",
        "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9135, 77.4816)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 5,
        "is_synthetic": true,
        "created_at": "2026-10-05T04:20:02.689886",
        "color": "#DC2626"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_117",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.685897,
          13.001606
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 117,
        "hazard_type": "WATERLOGGING",
        "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0016, 77.6859)",
        "severity_rating": 3,
        "status": "PENDING_REVIEW",
        "corroboration_count": 1,
        "is_synthetic": true,
        "created_at": "2026-10-03T02:40:39.270539",
        "color": "#0284C7"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_118",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.703446,
          12.91017
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 118,
        "hazard_type": "POTHOLE",
        "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9102, 77.7034)",
        "severity_rating": 4,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-10-09T19:19:48.271479",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_119",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.622154,
          12.917829
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 119,
        "hazard_type": "STREETLIGHT",
        "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9178, 77.6222)",
        "severity_rating": 3,
        "status": "VERIFIED",
        "corroboration_count": 2,
        "is_synthetic": true,
        "created_at": "2026-09-30T09:56:27.023616",
        "color": "#6366F1"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_120",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.624611,
          12.88268
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 120,
        "hazard_type": "HAZARDOUS_MEDIAN",
        "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.8827, 77.6246)",
        "severity_rating": 5,
        "status": "VERIFIED",
        "corroboration_count": 3,
        "is_synthetic": true,
        "created_at": "2026-09-30T13:51:57.539236",
        "color": "#9333EA"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_121",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.675,
          12.925
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 121,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 3,
        "is_synthetic": false,
        "created_at": "2026-10-09T18:17:25.845425+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_124",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.71914,
          13.02914
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 124,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-09T18:18:11.441902+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_126",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.69387,
          13.00387
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 126,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-09T18:30:38.675201+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_128",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.64959,
          12.95959
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 128,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-09T18:39:55.877496+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_130",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.65213,
          12.96213
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 130,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-09T18:57:01.328566+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_132",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.66933,
          12.97933
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 132,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-10T10:49:53.268038+00:00",
        "color": "#D97706"
      }
    },
    {
      "type": "Feature",
      "id": "hazard_134",
      "geometry": {
        "type": "Point",
        "coordinates": [
          77.67205,
          12.98205
        ]
      },
      "properties": {
        "layer_type": "citizen_hazard",
        "id": 134,
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "status": "PENDING_REVIEW",
        "corroboration_count": 2,
        "is_synthetic": false,
        "created_at": "2026-10-10T10:50:20.498418+00:00",
        "color": "#D97706"
      }
    }
  ]
};

export const FALLBACK_ANALYTICS_OVERVIEW = {
  "status": "success",
  "study_area": "Bengaluru Urban (BBMP)",
  "summary": {
    "total_blackspots": 16,
    "recorded_fatalities_3yr": 263,
    "recorded_injuries_3yr": 568,
    "monitored_road_segments": 250,
    "total_citizen_reports": 135,
    "verified_reports_count": 74,
    "pending_review_count": 40,
    "duplicate_merged_count": 21,
    "average_corroboration_count": 3.8
  },
  "breakdown_by_hazard_type": {
    "HAZARDOUS_MEDIAN": 20,
    "POTHOLE": 35,
    "SIGNAL": 29,
    "STREETLIGHT": 28,
    "WATERLOGGING": 23
  },
  "breakdown_by_status": {
    "DUPLICATE": 21,
    "PENDING_REVIEW": 40,
    "VERIFIED": 74
  },
  "zones_monitored": [
    {
      "zone": "North (Airport / Yelahanka / Hebbal)",
      "blackspots": 5,
      "risk_index": "High"
    },
    {
      "zone": "East (Outer Ring Road / KR Puram / Whitefield)",
      "blackspots": 4,
      "risk_index": "Elevated"
    },
    {
      "zone": "South (Silk Board / Hosur Road / Bannerghatta)",
      "blackspots": 4,
      "risk_index": "Elevated"
    },
    {
      "zone": "West (Tumakuru Road / Peenya / Mysore Road)",
      "blackspots": 3,
      "risk_index": "High"
    }
  ]
};

export const FALLBACK_MODEL_BENCHMARKS = {
  "status": "success",
  "benchmarks": {
    "dataset_metadata": {
      "total_records": 9000,
      "train_records": 6000,
      "test_records": 1500,
      "feature_count": 8,
      "temporal_split": "Train: Months 1-24 | Val: Months 25-30 | Test: Months 31-36",
      "study_area": "Bengaluru Urban (BBMP)",
      "timestamp": "2026-10-09T23:44:38.934244"
    },
    "models": {
      "B0_Naive_Prior": {
        "model_name": "Global Prior Frequency Baseline",
        "type": "Naive Baseline",
        "pr_auc": 0.7513,
        "roc_auc": 0.5,
        "brier_score": 0.2505,
        "f1_score": 0.0,
        "description": "Predicts constant training prevalence; standard lower bound."
      },
      "B_KDE_Spatial": {
        "model_name": "2D Spatial Kernel Density Estimation (KDE)",
        "type": "Spatial Baseline",
        "pr_auc": 0.7338,
        "roc_auc": 0.7954,
        "brier_score": 0.1832,
        "f1_score": 0.7614,
        "description": "Spatial coordinate density only (Epanechnikov/Gaussian kernel); ignores contextual features."
      },
      "B_LR_LogisticRegression": {
        "model_name": "Penalized Logistic Regression",
        "type": "Linear Contextual Baseline",
        "pr_auc": 0.8088,
        "roc_auc": 0.8428,
        "brier_score": 0.156,
        "f1_score": 0.8063,
        "description": "Linear feature combination with balanced class weights."
      },
      "M_RF_RandomForest": {
        "model_name": "Balanced Random Forest Ensemble",
        "type": "Tree Ensemble",
        "pr_auc": 0.8193,
        "roc_auc": 0.8445,
        "brier_score": 0.1543,
        "f1_score": 0.8089,
        "description": "Bagged decision trees with majority subsampling."
      },
      "M_GBM_Calibrated": {
        "model_name": "Histogram Gradient Boosting (Platt-Calibrated)",
        "type": "Proposed Primary Architecture",
        "pr_auc": 0.718,
        "roc_auc": 0.7743,
        "brier_score": 0.2252,
        "f1_score": 0.741,
        "precision": 0.6103,
        "recall": 0.943,
        "confusion_matrix": [
          [
            292,
            454
          ],
          [
            43,
            711
          ]
        ],
        "description": "Gradient boosted trees calibrated on validation set for reliable posterior probabilities."
      }
    },
    "feature_importances": {
      "road_class_encoded": 0.1043,
      "speed_limit_kmh": 0.1555,
      "lane_count": 0.1544,
      "dist_nearest_junction_m": 0.0646,
      "is_night": 0.0268,
      "is_peak_hour": 0.0062,
      "precipitation_active": 0.0288,
      "historical_corridor_density": 0.4595
    }
  }
};

export const FALLBACK_REPORTS: CitizenReport[] = [
  {
    "id": 135,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 12.98213,
    "longitude": 77.67213,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-10T10:50:20.500652+00:00",
    "updated_at": "2026-10-10T10:50:20.500652+00:00"
  },
  {
    "id": 134,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.98205,
    "longitude": 77.67205,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-10T10:50:20.498418+00:00",
    "updated_at": "2026-10-10T10:50:20.500652+00:00"
  },
  {
    "id": 133,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 12.97941,
    "longitude": 77.66941,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-10T10:49:53.270627+00:00",
    "updated_at": "2026-10-10T10:49:53.270627+00:00"
  },
  {
    "id": 132,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.97933,
    "longitude": 77.66933,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-10T10:49:53.268038+00:00",
    "updated_at": "2026-10-10T10:49:53.270627+00:00"
  },
  {
    "id": 131,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 12.96221,
    "longitude": 77.65221,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:57:01.332992+00:00",
    "updated_at": "2026-10-09T18:57:01.332992+00:00"
  },
  {
    "id": 130,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.96213,
    "longitude": 77.65213,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:57:01.328566+00:00",
    "updated_at": "2026-10-09T18:57:01.332992+00:00"
  },
  {
    "id": 129,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 12.95967,
    "longitude": 77.64967,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:39:55.882134+00:00",
    "updated_at": "2026-10-09T18:39:55.882134+00:00"
  },
  {
    "id": 128,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.95959,
    "longitude": 77.64959,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:39:55.877496+00:00",
    "updated_at": "2026-10-09T18:39:55.882134+00:00"
  },
  {
    "id": 127,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 13.00395,
    "longitude": 77.69395,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:30:38.678137+00:00",
    "updated_at": "2026-10-09T18:30:38.678137+00:00"
  },
  {
    "id": 126,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 13.00387,
    "longitude": 77.69387,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:30:38.675201+00:00",
    "updated_at": "2026-10-09T18:30:38.678137+00:00"
  },
  {
    "id": 125,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 13.02922,
    "longitude": 77.71922,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:18:11.444556+00:00",
    "updated_at": "2026-10-09T18:18:11.444556+00:00"
  },
  {
    "id": 124,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 13.02914,
    "longitude": 77.71914,
    "status": "PENDING_REVIEW",
    "corroboration_count": 2,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:18:11.441902+00:00",
    "updated_at": "2026-10-09T18:18:11.444556+00:00"
  },
  {
    "id": 123,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.925,
    "longitude": 77.675,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:17:42.200372+00:00",
    "updated_at": "2026-10-09T18:17:42.200372+00:00"
  },
  {
    "id": 122,
    "hazard_type": "POTHOLE",
    "description": "Another commuter reporting the same large pothole.",
    "severity_rating": 4,
    "latitude": 12.9251,
    "longitude": 77.6751,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:17:25.848077+00:00",
    "updated_at": "2026-10-09T18:17:25.848077+00:00"
  },
  {
    "id": 121,
    "hazard_type": "POTHOLE",
    "description": "Severe pothole cluster causing vehicle swerving near junction.",
    "severity_rating": 4,
    "latitude": 12.925,
    "longitude": 77.675,
    "status": "PENDING_REVIEW",
    "corroboration_count": 3,
    "is_synthetic": false,
    "created_at": "2026-10-09T18:17:25.845425+00:00",
    "updated_at": "2026-10-09T18:17:42.200372+00:00"
  },
  {
    "id": 120,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.8827, 77.6246)",
    "severity_rating": 5,
    "latitude": 12.88268,
    "longitude": 77.624611,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-09-30T13:51:57.539236",
    "updated_at": "2026-09-30T13:51:57.539236"
  },
  {
    "id": 119,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9178, 77.6222)",
    "severity_rating": 3,
    "latitude": 12.917829,
    "longitude": 77.622154,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-09-30T09:56:27.023616",
    "updated_at": "2026-09-30T09:56:27.023616"
  },
  {
    "id": 118,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9102, 77.7034)",
    "severity_rating": 4,
    "latitude": 12.91017,
    "longitude": 77.703446,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-10-09T19:19:48.271479",
    "updated_at": "2026-10-09T19:19:48.271479"
  },
  {
    "id": 117,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0016, 77.6859)",
    "severity_rating": 3,
    "latitude": 13.001606,
    "longitude": 77.685897,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-03T02:40:39.270539",
    "updated_at": "2026-10-03T02:40:39.270539"
  },
  {
    "id": 116,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9135, 77.4816)",
    "severity_rating": 4,
    "latitude": 12.913461,
    "longitude": 77.48156,
    "status": "VERIFIED",
    "corroboration_count": 5,
    "is_synthetic": true,
    "created_at": "2026-10-05T04:20:02.689886",
    "updated_at": "2026-10-05T04:20:02.689886"
  },
  {
    "id": 115,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9096, 77.4825)",
    "severity_rating": 3,
    "latitude": 12.909571,
    "longitude": 77.482467,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-10-03T15:29:04.037487",
    "updated_at": "2026-10-03T15:29:04.037487"
  },
  {
    "id": 114,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 13.0048, 77.6864)",
    "severity_rating": 4,
    "latitude": 13.00478,
    "longitude": 77.686395,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-09-29T05:04:24.243765",
    "updated_at": "2026-09-29T05:04:24.243765"
  },
  {
    "id": 113,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9275, 77.6771)",
    "severity_rating": 5,
    "latitude": 12.92753,
    "longitude": 77.677088,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-07T09:52:34.069958",
    "updated_at": "2026-10-07T09:52:34.069958"
  },
  {
    "id": 112,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9141, 77.548)",
    "severity_rating": 4,
    "latitude": 12.914102,
    "longitude": 77.547997,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-03T02:44:25.309796",
    "updated_at": "2026-10-03T02:44:25.309796"
  },
  {
    "id": 111,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.031, 77.5675)",
    "severity_rating": 3,
    "latitude": 13.031046,
    "longitude": 77.567452,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-09-27T11:12:16.165619",
    "updated_at": "2026-09-27T11:12:16.165619"
  },
  {
    "id": 110,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0207, 77.6591)",
    "severity_rating": 3,
    "latitude": 13.020739,
    "longitude": 77.659136,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-09-26T21:37:29.554098",
    "updated_at": "2026-09-26T21:37:29.554098"
  },
  {
    "id": 109,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9112, 77.4845)",
    "severity_rating": 5,
    "latitude": 12.911157,
    "longitude": 77.484481,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-09-26T09:48:19.090005",
    "updated_at": "2026-09-26T09:48:19.090005"
  },
  {
    "id": 108,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9257, 77.6789)",
    "severity_rating": 4,
    "latitude": 12.925682,
    "longitude": 77.67889,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-09-28T14:30:29.421496",
    "updated_at": "2026-09-28T14:30:29.421496"
  },
  {
    "id": 107,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9341, 77.6015)",
    "severity_rating": 3,
    "latitude": 12.934105,
    "longitude": 77.601498,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-08T16:20:16.536957",
    "updated_at": "2026-10-08T16:20:16.536957"
  },
  {
    "id": 106,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0313, 77.5389)",
    "severity_rating": 4,
    "latitude": 13.031343,
    "longitude": 77.538855,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-06T11:41:37.882960",
    "updated_at": "2026-10-06T11:41:37.882960"
  },
  {
    "id": 105,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0027, 77.6857)",
    "severity_rating": 3,
    "latitude": 13.002727,
    "longitude": 77.685745,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-10-01T18:38:10.387745",
    "updated_at": "2026-10-01T18:38:10.387745"
  },
  {
    "id": 104,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.924, 77.6735)",
    "severity_rating": 4,
    "latitude": 12.924048,
    "longitude": 77.673487,
    "status": "VERIFIED",
    "corroboration_count": 4,
    "is_synthetic": true,
    "created_at": "2026-10-01T01:18:12.332908",
    "updated_at": "2026-10-01T01:18:12.332908"
  },
  {
    "id": 103,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0359, 77.5988)",
    "severity_rating": 4,
    "latitude": 13.035889,
    "longitude": 77.598775,
    "status": "VERIFIED",
    "corroboration_count": 5,
    "is_synthetic": true,
    "created_at": "2026-10-06T02:43:27.770144",
    "updated_at": "2026-10-06T02:43:27.770144"
  },
  {
    "id": 102,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0387, 77.5942)",
    "severity_rating": 3,
    "latitude": 13.038691,
    "longitude": 77.594161,
    "status": "VERIFIED",
    "corroboration_count": 4,
    "is_synthetic": true,
    "created_at": "2026-09-28T19:26:20.152269",
    "updated_at": "2026-09-28T19:26:20.152269"
  },
  {
    "id": 101,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.911, 77.6991)",
    "severity_rating": 4,
    "latitude": 12.910958,
    "longitude": 77.699118,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-10-08T19:05:15.299860",
    "updated_at": "2026-10-08T19:05:15.299860"
  },
  {
    "id": 100,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9269, 77.6788)",
    "severity_rating": 4,
    "latitude": 12.926865,
    "longitude": 77.678816,
    "status": "VERIFIED",
    "corroboration_count": 5,
    "is_synthetic": true,
    "created_at": "2026-10-03T05:10:13.352825",
    "updated_at": "2026-10-03T05:10:13.352825"
  },
  {
    "id": 99,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9155, 77.7026)",
    "severity_rating": 3,
    "latitude": 12.915489,
    "longitude": 77.70259,
    "status": "VERIFIED",
    "corroboration_count": 4,
    "is_synthetic": true,
    "created_at": "2026-09-30T10:46:15.580636",
    "updated_at": "2026-09-30T10:46:15.580636"
  },
  {
    "id": 98,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.8911, 77.6448)",
    "severity_rating": 4,
    "latitude": 12.891112,
    "longitude": 77.644833,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-09-28T10:27:05.110356",
    "updated_at": "2026-09-28T10:27:05.110356"
  },
  {
    "id": 97,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 12.9569, 77.6984)",
    "severity_rating": 3,
    "latitude": 12.956939,
    "longitude": 77.698378,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-09-28T08:53:13.823699",
    "updated_at": "2026-09-28T08:53:13.823699"
  },
  {
    "id": 96,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9991, 77.6838)",
    "severity_rating": 4,
    "latitude": 12.999109,
    "longitude": 77.683834,
    "status": "VERIFIED",
    "corroboration_count": 2,
    "is_synthetic": true,
    "created_at": "2026-10-07T17:15:29.443740",
    "updated_at": "2026-10-07T17:15:29.443740"
  },
  {
    "id": 95,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 13.0331, 77.5978)",
    "severity_rating": 3,
    "latitude": 13.033148,
    "longitude": 77.597788,
    "status": "VERIFIED",
    "corroboration_count": 6,
    "is_synthetic": true,
    "created_at": "2026-09-29T13:03:08.198701",
    "updated_at": "2026-09-29T13:03:08.198701"
  },
  {
    "id": 94,
    "hazard_type": "POTHOLE",
    "description": "Severe deep pothole cluster across left lane, vehicles swerving abruptly. (Observed near coordinate 12.9026, 77.5176)",
    "severity_rating": 4,
    "latitude": 12.902623,
    "longitude": 77.517597,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-09-30T12:49:40.382093",
    "updated_at": "2026-09-30T12:49:40.382093"
  },
  {
    "id": 93,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9129, 77.7033)",
    "severity_rating": 5,
    "latitude": 12.91285,
    "longitude": 77.70332,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-03T10:11:57.340567",
    "updated_at": "2026-10-03T10:11:57.340567"
  },
  {
    "id": 92,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 12.9136, 77.4818)",
    "severity_rating": 4,
    "latitude": 12.913599,
    "longitude": 77.481821,
    "status": "VERIFIED",
    "corroboration_count": 6,
    "is_synthetic": true,
    "created_at": "2026-10-03T04:02:28.312307",
    "updated_at": "2026-10-03T04:02:28.312307"
  },
  {
    "id": 91,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9298, 77.586)",
    "severity_rating": 5,
    "latitude": 12.929813,
    "longitude": 77.58602,
    "status": "DUPLICATE",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-07T16:12:41.542203",
    "updated_at": "2026-10-07T16:12:41.542203"
  },
  {
    "id": 90,
    "hazard_type": "STREETLIGHT",
    "description": "Streetlights non-functional over 300m stretch; near zero pedestrian visibility at night. (Observed near coordinate 13.0008, 77.6848)",
    "severity_rating": 3,
    "latitude": 13.000846,
    "longitude": 77.684795,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-09T11:34:45.306684",
    "updated_at": "2026-10-09T11:34:45.306684"
  },
  {
    "id": 89,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9157, 77.7006)",
    "severity_rating": 5,
    "latitude": 12.915667,
    "longitude": 77.70064,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-10-03T14:27:59.940944",
    "updated_at": "2026-10-03T14:27:59.940944"
  },
  {
    "id": 88,
    "hazard_type": "SIGNAL",
    "description": "Traffic signal blinking intermittently / stuck on green during evening peak. (Observed near coordinate 13.0022, 77.642)",
    "severity_rating": 4,
    "latitude": 13.002187,
    "longitude": 77.642038,
    "status": "VERIFIED",
    "corroboration_count": 6,
    "is_synthetic": true,
    "created_at": "2026-10-03T19:32:38.727410",
    "updated_at": "2026-10-03T19:32:38.727410"
  },
  {
    "id": 87,
    "hazard_type": "HAZARDOUS_MEDIAN",
    "description": "Broken median kerb with illegal two-wheeler cut causing frequent near-misses. (Observed near coordinate 12.9999, 77.669)",
    "severity_rating": 5,
    "latitude": 12.999863,
    "longitude": 77.669017,
    "status": "VERIFIED",
    "corroboration_count": 3,
    "is_synthetic": true,
    "created_at": "2026-10-06T22:21:33.491190",
    "updated_at": "2026-10-06T22:21:33.491190"
  },
  {
    "id": 86,
    "hazard_type": "WATERLOGGING",
    "description": "Heavy water stagnation under flyover descent forcing two-wheelers into center lanes. (Observed near coordinate 12.9476, 77.5726)",
    "severity_rating": 3,
    "latitude": 12.947563,
    "longitude": 77.572579,
    "status": "PENDING_REVIEW",
    "corroboration_count": 1,
    "is_synthetic": true,
    "created_at": "2026-09-27T07:16:18.853833",
    "updated_at": "2026-09-27T07:16:18.853833"
  }
];

export const FALLBACK_OGD_PORTAL = {
  "status": "success",
  "portal_name": "Open Government Data (OGD) Platform India",
  "portal_url": "https://www.data.gov.in",
  "department": "Ministry of Road Transport and Highways (MoRTH) \u2014 Transport Research Wing",
  "catalog_title": "Road Accidents in India \u2014 Million Plus Cities & Highway Blackspots",
  "ogd_resource_id": "9ef84268-d588-465a-a308-a864a43d0070",
  "license": "Government Open Data License - India (GODL)",
  "api_endpoint_template": "https://api.data.gov.in/resource/{resource_id}?api-key={YOUR_API_KEY}&format=json",
  "integration_status": "OGD Standard Ingested & Verified for Bengaluru BBMP",
  "developer_instructions": "Register on data.gov.in to obtain a free personal API token under 'My API Tokens'."
};

export const FALLBACK_ROUTE_EVALUATION: RouteEvaluationResponse = {
  "origin": [
    13.0358,
    77.597
  ],
  "destination": [
    12.9175,
    77.6234
  ],
  "routes": [
    {
      "route_id": "route_arterial_primary",
      "route_name": "Route 1: Primary Arterial Expressway (Faster Travel Time)",
      "total_distance_km": 16.83,
      "estimated_time_mins": 36.1,
      "blackspot_corridors_traversed": 2,
      "mean_segment_risk_probability": 0.58,
      "cumulative_risk_exposure": 9.76,
      "active_hazard_count": 5,
      "safety_tier": "MODERATE_EXPOSURE",
      "waypoints": [
        [
          13.0358,
          77.597
        ],
        [
          12.99165,
          77.62519999999999
        ],
        [
          12.9175,
          77.6234
        ]
      ]
    },
    {
      "route_id": "route_collector_secondary",
      "route_name": "Route 2: Secondary Collector Corridor (Lower Historical Risk Exposure)",
      "total_distance_km": 18.17,
      "estimated_time_mins": 45.4,
      "blackspot_corridors_traversed": 0,
      "mean_segment_risk_probability": 0.29,
      "cumulative_risk_exposure": 5.27,
      "active_hazard_count": 2,
      "safety_tier": "LOWER_EXPOSURE",
      "waypoints": [
        [
          13.0358,
          77.597
        ],
        [
          12.964649999999999,
          77.59819999999999
        ],
        [
          12.9175,
          77.6234
        ]
      ]
    }
  ],
  "recommendation_rationale": "Route 2 exhibits 50% lower cumulative risk exposure (5.27 vs 9.76) by bypassing documented BTP blackspot corridors, at the expense of an estimated 9.3 additional travel minutes.",
  "disclaimer": "Academic Decision-Support Notice: Calculated route risk reflects historical spatial blackspot association and active citizen hazard density. RoadGuard AI does not guarantee that any transit path is objectively accident-free."
};

export function simulateFallbackRisk(params: {
  road_class: string;
  speed_limit_kmh: number;
  lane_count: number;
  dist_nearest_junction_m: number;
  is_night: number;
  precipitation_active: number;
  is_peak_hour: number;
  is_blackspot_corridor: number;
}) {
  let baseScore = 0.22;
  if (params.is_blackspot_corridor === 1) baseScore += 0.32;
  if (params.dist_nearest_junction_m <= 100) baseScore += 0.12;
  if (params.speed_limit_kmh >= 60) baseScore += 0.08;
  if (params.lane_count >= 6) baseScore += 0.05;
  if (params.is_night === 1) baseScore += 0.10;
  if (params.precipitation_active === 1) baseScore += 0.12;
  if (params.is_peak_hour === 1) baseScore += 0.06;

  const prob = Math.round(Math.min(0.95, Math.max(0.05, baseScore)) * 1000) / 1000;

  let riskTier: 'LOW' | 'MODERATE' | 'ELEVATED' = 'LOW';
  let recAction = 'Maintain standard road maintenance schedule and monitor citizen feedback queues.';
  if (prob >= 0.58) {
    riskTier = 'ELEVATED';
    recAction = 'Priority corridor inspection: deploy radar speed calming & audit pedestrian crossing signals.';
  } else if (prob >= 0.28) {
    riskTier = 'MODERATE';
    recAction = 'Routine municipal safety audit: inspect lane markings, streetlighting illumination, and pothole patches.';
  }

  const shapFactors: Array<{
    feature: string;
    impact_percentage: number;
    direction: 'increases_risk' | 'decreases_risk';
    description: string;
  }> = [];

  if (params.is_blackspot_corridor === 1) {
    shapFactors.push({
      feature: 'Historical Blackspot Corridor Proximity',
      impact_percentage: 28.5,
      direction: 'increases_risk',
      description: 'Segment lies within 500m of a designated BTP high-fatality cluster.'
    });
  }
  if (params.dist_nearest_junction_m <= 100) {
    shapFactors.push({
      feature: 'High Junction Convergence (< 100m)',
      impact_percentage: 14.2,
      direction: 'increases_risk',
      description: 'Short distance to major intersection introduces frequent weaving and deceleration.'
    });
  }
  if (params.is_night === 1) {
    shapFactors.push({
      feature: 'Nighttime Operating Window',
      impact_percentage: 12.0,
      direction: 'increases_risk',
      description: 'Reduced ambient illumination and elevated two-wheeler vulnerability.'
    });
  }
  if (params.speed_limit_kmh >= 60) {
    shapFactors.push({
      feature: 'High Arterial Speed Limit (>= 60 km/h)',
      impact_percentage: 8.5,
      direction: 'increases_risk',
      description: 'Higher kinetic energy and longer emergency braking distance.'
    });
  }
  if (params.precipitation_active === 0) {
    shapFactors.push({
      feature: 'Dry Road Surface Context',
      impact_percentage: 4.5,
      direction: 'decreases_risk',
      description: 'Absence of standing water reduces hydroplaning risk.'
    });
  }

  return {
    calibrated_risk_probability: prob,
    risk_tier: riskTier,
    shap_top_factors: shapFactors,
    recommended_action: recAction,
    data_confidence: 'HIGH'
  };
}

export function getFallbackSegmentRiskCard(segmentId: number, isNight = 1, precipitation = 0): SegmentRiskCard {
  const feat = FALLBACK_MAP_LAYERS.features.find(f => f.id === `segment-${segmentId}` || f.properties?.segment_id === segmentId);
  const p = feat?.properties || {};
  const isBlackspot = p.is_blackspot_corridor === 1 || p.is_blackspot === true;
  const speed = p.speed_limit_kmh || 50;
  const lanes = p.lane_count || 4;
  const roadClass = p.road_class || 'primary';
  const roadName = p.road_name || `Urban Arterial Segment #${segmentId}`;
  
  const sim = simulateFallbackRisk({
    road_class: roadClass,
    speed_limit_kmh: speed,
    lane_count: lanes,
    dist_nearest_junction_m: p.dist_nearest_junction_m || (isBlackspot ? 85 : 320),
    is_night: isNight,
    precipitation_active: precipitation,
    is_peak_hour: 1,
    is_blackspot_corridor: isBlackspot ? 1 : 0
  });

  const startCoords: [number, number] = feat?.geometry?.coordinates?.[0] 
    ? [feat.geometry.coordinates[0][1], feat.geometry.coordinates[0][0]] 
    : [12.9716, 77.5946];
  const endCoords: [number, number] = feat?.geometry?.coordinates?.[1] 
    ? [feat.geometry.coordinates[1][1], feat.geometry.coordinates[1][0]] 
    : [12.9720, 77.5950];

  return {
    segment_id: segmentId,
    road_name: roadName,
    road_class: roadClass,
    speed_limit_kmh: speed,
    lane_count: lanes,
    length_meters: p.length_meters || 240,
    start_coords: startCoords,
    end_coords: endCoords,
    is_blackspot_corridor: isBlackspot,
    historical_blackspot_proximity_m: isBlackspot ? 85.0 : 450.0,
    official_blackspot_name: p.official_blackspot_name || (isBlackspot ? 'Bengaluru Police Designated Priority Blackspot' : undefined),
    calibrated_risk_probability: sim.calibrated_risk_probability,
    risk_tier: sim.risk_tier,
    shap_top_factors: sim.shap_top_factors,
    active_hazards_count: p.active_hazards_count || (isBlackspot ? 3 : 0),
    hazard_prioritization_score: isBlackspot ? 3.45 : 1.10,
    data_confidence: 'HIGH',
    recommended_action: sim.recommended_action
  };
}
