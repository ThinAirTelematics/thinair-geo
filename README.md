# ThinAir Geo MCP Server

Connect your AI to **geocoding, routing, traffic, weather, and place search** — 10 tools via MCP.

[![npm version](https://img.shields.io/npm/v/@thinairtelematics/geo)](https://www.npmjs.com/package/@thinairtelematics/geo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![smithery badge](https://smithery.ai/badge/bwakefield/thinair-geo)](https://smithery.ai/servers/bwakefield/thinair-geo)

## What It Does

ThinAir Geo is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives AI agents access to production-grade geospatial tools — no API integration required.

- **Geocoding** — Forward, reverse, autocomplete, structured, and intersection geocoding
- **Routing** — Turn-by-turn directions with 7 vehicle profiles including truck/freight
- **Traffic** — Real-time traffic conditions for 30+ US metros
- **Weather** — Current conditions and forecasts
- **Place Search** — Nearby POI and location discovery

## Product Links

- **Main:** https://geo.thinair.co
- **Connect / get key:** https://geo.thinair.co/connect
- **Docs:** https://geo.thinair.co/docs/getting-started
- **Pricing:** https://geo.thinair.co/checkout

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

| Profile | Use Case |
|---------|----------|
| `car_default` | Standard driving |
| `truck_53` | 53' dry van / full freight |
| `truck_box26` | Box truck / medium duty |
| `truck_tanker` | Hazmat-capable freight |
| `motorcycle` | Two-wheel routing |
| `bike` | Cycling |
| `walk` | Walking |

## Quick Start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "thinair-geo": {
      "command": "npx",
      "args": ["-y", "@thinairtelematics/geo"],
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
      "args": ["-y", "@thinairtelematics/geo"],
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

## npm Package

[npmjs.com/package/@thinairtelematics/geo](https://www.npmjs.com/package/@thinairtelematics/geo)

> Previously published as `thinair-geo` (now deprecated in favor of the scoped package).

## License

MIT © [ThinAir Telematics](https://thinair.co)
