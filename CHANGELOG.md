# Changelog

All notable changes to `@thinairtelematics/geo` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
and the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

## [2.0.4] — 2026-04-26

### Changed
- Release pipeline moved to a dedicated public repository
  (https://github.com/ThinAirTelematics/thinair-geo) — enables npm provenance
  attestation without exposing the source monorepo. First version published
  with `--provenance` from CI.

## [2.0.3] — 2026-04-26

### Removed
- Dropped `repository` and `bugs.url` fields that pointed to the source repo.
  Issues and source links route through https://geo.thinair.co/support and
  support@thinair.co instead.

## [2.0.2] — 2026-04-26

### Added
- `mcpName: "co.thinair/geo"` in `package.json` for MCP Registry ownership verification.

### Changed
- MCP Registry namespace updated to slash-separated format (`co.thinair/geo`).

## [2.0.1] — 2026-04-26

### Added
- Initial `mcpName` field for the MCP Registry (later corrected in 2.0.2).

## [2.0.0] — 2026-04-26

### Changed
- **Renamed package** from `thinair-geo` (unscoped) to `@thinairtelematics/geo` (scoped).
- Org namespace: now published under `thinairtelematics` org on npm.
- Bin name unchanged: `thinair-geo` for `npx` invocation.
- README, badges, and footer URLs updated for the new package name.

### Migration
The unscoped `thinair-geo@1.0.x` has been deprecated; npm will surface the
deprecation message pointing users at `@thinairtelematics/geo`. No code changes
needed in consumers — the printed config block is identical.

## [1.0.1] — 2026-04-25

### Added
- `LICENSE` file (MIT) shipped in tarball.
- Geist Mono `500` weight added to font preload list (eliminates a swap flash
  inside the typography of the printed config block).
- "Try with npx" pointer in the README now uses the canonical short form.

### Fixed
- README links section: removed dangling Discord/Enterprise lines, added
  `Main: https://geo.thinair.co` as first link.

## [1.0.0] — 2026-04-25

### Added
- Initial public release.
- `npx thinair-geo` prints a ready-to-paste MCP client config block for the
  hosted `https://geo.thinair.co/mcp` endpoint.
- Flags: `--api-key <key>`, `--transport sse`.
- Keyless OAuth 2.1 default; key-bearing variant for non-OAuth clients.
- Zero runtime dependencies.

