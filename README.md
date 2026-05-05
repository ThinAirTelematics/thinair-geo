# ThinAir Geo MCP Server

**Give your AI agent complete geospatial awareness** — geocode addresses and intersections, route across multiple modes (auto, truck, bicycle, pedestrian), check live traffic and weather, draw reachability polygons, and search places. Confidence-scored results so your agent knows when to ask again. 10 tools via MCP.

[![npm version](https://img.shields.io/npm/v/@thinairtelematics/geo)](https://www.npmjs.com/package/@thinairtelematics/geo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![smithery badge](https://smithery.ai/badge/thinair/geo)](https://smithery.ai/servers/thinair/geo)

## What It Does

ThinAir Geo is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives AI agents full-stack geospatial tooling — no API integration required. Coordinates you can actually route from: intersection-level precision with confidence scores, no silent fallbacks (returns an empty result instead of a city-centroid guess when uncertain).

- **Geocoding** — Forward, reverse, intersection, and batch (50/call). Results include `confidence` and `method` so agents can branch on quality.
- **Routing** — Multi-profile: auto, truck, bicycle, pedestrian, motorcycle. 10 truck-specific presets (dry van, flatbed, step-deck, tanker, box truck, auto-carrier, sprinter, double trailer, oversize) with hazmat / dimensions / weight / time-distance constraints native.
- **Traffic** — Real-time conditions for 30+ US metros.
- **Weather** — Current conditions and forecasts.
- **Place Search & Explore** — Nearby POIs, locality discovery with population filtering.
- **Isochrones** — Drive-time / walk-time reachability polygons (multiple bands per call).

## Product Links

- **Main:** https://geo.thinair.co
- **Connect / get key:** https://geo.thinair.co/connect
- **Docs:** https://geo.thinair.co/docs/getting-started
- **Pricing:** https://geo.thinair.co/checkout

## Tools

| Tool | Description |
|------|-------------|
| `geocode` | Convert addresses, place names, or intersections to coordinates |
| `reverse_geocode` | Convert coordinates to addresses |
| `batch_geocode` | Geocode up to 50 addresses in one call (returns `geojson` FeatureCollection) |
| `directions` | Turn-by-turn routing — auto, truck, bicycle, pedestrian, motorcycle |
| `isochrone` | Travel-time / -distance reachability polygons (multi-band) |
| `traffic` | Real-time traffic conditions |
| `weather` | Current conditions and forecasts |
| `search_places` | Find nearby POIs by category (gas, charging, food, lodging, …) |
| `explore` | Browse cities, neighborhoods, and venues by region |
| `quota` | Inspect your current plan, daily usage, and remaining capacity (free, never debits) |

## Truck Vehicle Profiles

Pass any of these as `vehicle_profile` on `directions` or `isochrone` to set dimensions automatically:

| Profile | Dimensions / Use case |
|---------|------------------------|
| `DRY_VAN_53` | 53′ dry van — standard US freight (default) |
| `FLATBED_48` | 48′ flatbed, loaded height 14′ |
| `FLATBED_40` | 40′ flatbed, regional / specialty |
| `STEP_DECK` | Step-deck / drop-deck, 11′3″ upper-deck clearance |
| `TANKER` | Liquid/gas tanker (pair with `hazmat=true`) |
| `BOX_TRUCK_26` | 26′ box truck, local delivery |
| `AUTO_CARRIER` | Car hauler / auto transport |
| `SPRINTER_VAN` | Cargo van, last-mile (9′ tall) |
| `DOUBLE_TRAILER` | Twin 28′ pups, LTL long-haul (92′ total) |
| `OVERSIZE` | Permitted oversize loads — override dimensions per haul |

Individual params (`truck_height`, `truck_weight`, `truck_length`, `axle_count`, etc.) override the preset.

## Quick Start

### Claude Desktop, Cursor, Windsurf — OAuth (recommended, keyless)

Add to your client's MCP config (e.g. `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "thinair-geo": {
      "url": "https://geo.thinair.co/mcp"
    }
  }
}
```

The OAuth flow completes at first use — no manual token setup required. Free tier: 15 requests/day, no card.

### API key (for non-OAuth clients)

```json
{
  "mcpServers": {
    "thinair-geo": {
      "url": "https://geo.thinair.co/mcp",
      "headers": {
        "Authorization": "Bearer ta_live_..."
      }
    }
  }
}
```

Get a key at https://geo.thinair.co/connect.

### npx (CLI / scripts)

```bash
npx -y @thinairtelematics/geo
```

Prints a config block to stdout for your client. Same OAuth-keyless option as above by default.

## npm Package

[npmjs.com/package/@thinairtelematics/geo](https://www.npmjs.com/package/@thinairtelematics/geo)

> Previously published as `thinair-geo` (now deprecated in favor of the scoped package).

## License

MIT © [ThinAir Telematics](https://thinair.co)
