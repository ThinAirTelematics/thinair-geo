# ThinAir Geo MCP Server

Connect your AI to **geocoding, routing, traffic, weather, and place search** — 10 tools via MCP, powered by Pelias + Valhalla.

[![npm version](https://img.shields.io/npm/v/thinair-geo)](https://www.npmjs.com/package/thinair-geo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## What It Does

ThinAir Geo is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives AI agents access to production-grade geospatial tools:

- **Geocoding** — Forward, reverse, autocomplete, structured, and intersection geocoding
- **Routing** — Turn-by-turn directions with 7 vehicle profiles including truck/freight
- **Traffic** — Real-time traffic conditions for 30+ US metros
- **Weather** — Current conditions and forecasts
- **Place Search** — Nearby POI and location discovery

## Tools

| Tool | Description |
|------|-------------|
| `geocode` | Convert addresses or place names to coordinates |
| `reverse_geocode` | Convert coordinates to addresses |
| `autocomplete` | Real-time address suggestions as you type |
| `structured_geocode` | Geocode with individual address components |
| `intersection_geocode` | Resolve cross-street intersections |
| `directions` | Turn-by-turn routing with vehicle profiles |
| `isochrone` | Generate travel-time reachability polygons |
| `search_places` | Find nearby POIs and locations |
| `get_traffic` | Real-time traffic conditions |
| `get_weather` | Current weather and forecasts |

## Vehicle Profiles

| Profile | Costing | Use Case |
|---------|---------|----------|
| `car_default` | auto | Standard driving |
| `truck_53` | truck | 53' dry van / full freight |
| `truck_box26` | truck | Box truck / medium duty |
| `truck_tanker` | truck | Hazmat-capable freight |
| `motorcycle` | motorcycle | Two-wheel routing |
| `bike` | bicycle | Cycling |
| `walk` | pedestrian | Walking |

## Quick Start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "thinair-geo": {
      "command": "npx",
      "args": ["thinair-geo"],
      "env": {
        "THINAIR_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor / Windsurf / Other MCP Clients

```json
{
  "mcpServers": {
    "thinair-geo": {
      "command": "npx",
      "args": ["thinair-geo"],
      "env": {
        "THINAIR_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Remote / Streamable HTTP

```json
{
  "mcpServers": {
    "thinair-geo": {
      "type": "http",
      "url": "https://geo.thinair.co/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `https://api.thinair.co/v1/geocode/search` | Forward geocoding |
| `https://api.thinair.co/v1/geocode/reverse` | Reverse geocoding |
| `https://api.thinair.co/v1/geocode/autocomplete` | Autocomplete |
| `https://api.thinair.co/v1/geocode/structured` | Structured geocoding |
| `https://api.thinair.co/v1/route/route` | Turn-by-turn routing |
| `https://api.thinair.co/v1/route/isochrone` | Travel-time polygons |
| `https://api.thinair.co/v1/weather/weather` | Current weather |
| `https://api.thinair.co/v1/weather/traffic` | Live traffic |

## Example Usage

```bash
# Forward geocoding
curl "https://api.thinair.co/v1/geocode/search?text=1600+Pennsylvania+Ave+Washington+DC"

# Truck route — Houston to Dallas
curl -X POST "https://api.thinair.co/v1/route/route" \
  -H "Content-Type: application/json" \
  -d '{
    "locations": [
      {"lat": 29.7604, "lon": -95.3698},
      {"lat": 32.7767, "lon": -96.7970}
    ],
    "costing": "truck",
    "costing_options": {
      "truck": {
        "height": 4.11,
        "width": 2.6,
        "length": 22.25,
        "weight": 36.3,
        "use_truck_route": 1,
        "use_highways": 1
      }
    }
  }'
```

## Infrastructure

- **Geocoding**: [Pelias](https://pelias.io) — OpenStreetMap, OpenAddresses, Who's On First, Geonames, TIGER
- **Routing**: [Valhalla](https://valhalla.readthedocs.io) — OSM graph with live traffic overlay
- **Traffic**: TomTom Flow API — 30+ US metro areas, 45-minute refresh
- **Platform**: Cloudflare Workers + Azure AKS
- **Auth**: OAuth 2.1 + API key

## Get an API Key

Sign up at [thinair.co](https://thinair.co) to get your free API key.

## License

MIT © [ThinAir Telematics](https://thinair.co)
