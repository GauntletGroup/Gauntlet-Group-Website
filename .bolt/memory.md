# Project memory

## Product intent & audience

- Project for **Gauntlet Group** (`gauntlet-group.com`); building AI agent discovery and interoperability infrastructure.
- Implements emerging agent-protocol standards: MCP (Model Context Protocol), A2A (Agent-to-Agent), DNS-AID (agent DNS discovery), ARD (Agent Resource Discovery catalog).
- Audience: external AI agents/services that need to discover, authenticate, and interact with Gauntlet Group's agent endpoints.

## Brand personality & voice

- Technical, protocol-oriented documentation; clear and instructional tone.
- User communicates informally, prefers direct step-by-step guidance over verbose explanation.

## Visual design & UX direction

- Stack: Vite + React (JSX), Tailwind CSS, Lucide React icons. No additional UI/icon packages unless explicitly requested.
- User expects production-quality, non-generic designs when UI work is requested.
- Current work is backend/infra-focused (JSON files, DNS records) — no visible UI changes in scope yet.

## Decisions, constraints & rationale

- **Auth.md heading**: must be `# Auth.md` (capital M) for scanner recognition; lowercase `m` fails validation.
- **ARD catalog** (`/.well-known/ai-catalog.json`): includes a `host` object at top level; entries need `displayName` and `representativeQueries`. URN identifier pattern: `urn:air:gauntlet-group.com:...`.
- **Catalog entries** planned: MCP server, Agent Skills index (`/.well-known/agent-skills/index.json`), OpenAPI description (`/api/mcp-openapi.json`), service status (`/api/status.json`).
- **DNS-AID deferred**: user chose to skip code changes for DNS-AID and handle it manually via Netlify/Cloudflare guide. Netlify DNS UI does not support SVCB records.
- **DNS-AID records needed**: two SVCB records — `_index._agents` (alpn="https" port=443) and `_a2a._agents` (alpn="a2a" port=443), both priority 1, target `gauntlet-group.com.`
- Current nameservers: `dns1–4.p02.nsone.net` (NS1 via Netlify).
- Recommended DNS path: move DNS to Cloudflare (free) for SVCB + DNSSEC support; keep Netlify for hosting.

## Open questions & assumptions

- Assumed user has access to domain registrar to add DS record for DNSSEC.
- Assumed NS1 direct account may not exist separately from Netlify (Option B may not be viable).
- Verification URL for DNS-AID: `https://cloudflare-dns.com/dns-query?name=_index._agents.gauntlet-group.com&type=SVCB`
- Full scope of agent endpoints beyond the four catalog entries is not yet confirmed.