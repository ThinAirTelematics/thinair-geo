#!/usr/bin/env node
/**
 * @thinairtelematics/geo — local stdio reference adapter.
 *
 * Production runtime is hosted on Cloudflare Workers at
 * https://geo.thinair.co/mcp (streamable-http transport, OAuth 2.0 + Bearer).
 *
 * This file is a STATIC tool-catalog adapter that satisfies stdio-only
 * MCP runners (e.g. Glama's automated quality check, sandboxed CI) without
 * proxying to the hosted endpoint. tools/list returns the real tool catalog
 * so the runner indexes capabilities accurately; tools/call returns a
 * redirect message pointing the caller at the hosted endpoint for execution.
 *
 * Real users should configure their MCP client with the hosted URL directly
 * (printed by `bin/start.js`). This file exists for the quality-check gate.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const REDIRECT_MESSAGE =
  "This is the local reference adapter for ThinAir Geo. " +
  "Tool execution requires the hosted MCP server at https://geo.thinair.co/mcp. " +
  "Configure your MCP client with that URL (and a Bearer token from " +
  "https://geo.thinair.co/connect — free 7-day trial, no signup) to execute tools.";

const TOOLS = [
  {
    name: "geocode",
    description:
      "Convert an address, place name, street, or intersection into coordinates and structured location results. Use when input is text and you need coordinates before routing, weather, or search. Supports street-level resolution and proximity biasing.",
    inputSchema: { type: "object" },
  },
  {
    name: "reverse_geocode",
    description:
      "Convert coordinates into the nearest address, street, or place. Use when starting from GPS coordinates or a map position.",
    inputSchema: { type: "object" },
  },
  {
    name: "directions",
    description:
      "Generate routes, ETAs, and turn-by-turn directions between locations. Prefer the `preset` arg (car_default, truck_53, truck_tanker, bike, walk, transit, etc.) — presets bake in freight baselines so trucks actually stay on freight corridors. Raw `costing` + `truck_*` knobs remain for advanced callers. ETAs are ISO-8601 in the destination's local timezone.",
    inputSchema: { type: "object" },
  },
  {
    name: "traffic",
    description:
      "Retrieve live traffic conditions, congestion, and speed for a location. Coverage: live data for ~30 major US metros; returns degraded or empty values outside these areas. For rural coordinates, qualify the response.",
    inputSchema: { type: "object" },
  },
  {
    name: "weather",
    description:
      "Get current and forecast weather for a location, including severe weather alerts and minute-by-minute precipitation. Use for destination conditions, travel planning, or route risk assessment.",
    inputSchema: { type: "object" },
  },
  {
    name: "isochrone",
    description:
      "Generate travel-time or travel-distance reachability polygons from an origin. Pass MULTIPLE bands in one call — e.g. `contours_minutes:[10,20,30]` returns three nested polygons in a single response. Output is GeoJSON ready for Mapbox / Leaflet.",
    inputSchema: { type: "object" },
  },
  {
    name: "search_places",
    description:
      "CATEGORY-specific POI search near a point — gas stations, truck stops, restaurants, charging stations, etc. Use this when the user has a specific TYPE of place in mind. For broader DISCOVERY (e.g. 'cities within 50 miles'), use `explore` instead.",
    inputSchema: { type: "object" },
  },
  {
    name: "batch_geocode",
    description:
      "Geocode multiple addresses, intersections, or place queries in one request with structured per-record results. Use for bulk operations instead of repeated single geocode calls. Max 50 per batch.",
    inputSchema: { type: "object" },
  },
  {
    name: "explore",
    description:
      "BROWSING / DISCOVERY search — cities, neighbourhoods, or mixed venues near a location. Supports population filtering ('cities > 100k'), distance/population sorting, and layer filtering. For specific POI categories, use `search_places` instead.",
    inputSchema: { type: "object" },
  },
  {
    name: "quota",
    description:
      "Check current usage, remaining limits, plan, and quota breakdown for the caller. FREE TO CALL — never counts against your quota, never blocked by it. Use this proactively when the user asks about usage or seems near limits.",
    inputSchema: { type: "object" },
  },
  {
    name: "issue_api_key",
    description:
      "Mint a fresh API key for your current authenticated user/tenant. Useful for CLI workflows, key rotation, or MCP clients that hide the configured Bearer. The new key is tied to your existing plan. Counts as 1 query against your daily quota.",
    inputSchema: { type: "object" },
  },
];

const server = new Server(
  {
    name: "thinair-geo",
    version: "2.0.6",
  },
  {
    capabilities: { tools: {} },
    instructions:
      "This is the local reference adapter. The production server is hosted at https://geo.thinair.co/mcp — connect there for real tool execution. tools/list reflects the live tool catalog.",
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async () => ({
  content: [{ type: "text", text: REDIRECT_MESSAGE }],
  isError: false,
}));

const transport = new StdioServerTransport();
await server.connect(transport);
