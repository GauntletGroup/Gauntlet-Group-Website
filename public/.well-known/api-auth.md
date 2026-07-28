# API Authentication

## Status: Public — No Authentication Required

All agent-facing APIs and resources published by Gauntlet Group are **public** and require **no authentication, no access tokens, and no agent registration**.

## What This Means for Agents

- **No OAuth/OIDC provider is operated.** This site does not issue access tokens.
- **No agent registration is required.** There is no `register_uri` or credential provisioning flow.
- **No `Authorization` header is expected** on any endpoint listed below.
- **OAuth Protected Resource Metadata (`/.well-known/oauth-protected-resource`) is intentionally not published**, because there are no protected resources to describe.
- **OAuth Authorization Server Metadata (`/.well-known/oauth-authorization-server`) is intentionally not published**, because no authorization server is operated.

## Public Agent-Facing Endpoints

| Endpoint | Type | Description |
| --- | --- | --- |
| `https://gauntlet-group.com/mcp` | MCP Server | Model Context Protocol server for services and inquiry skills |
| `https://gauntlet-group.com/.well-known/agent-skills.json` | JSON | Machine-readable organization and services catalog |
| `https://gauntlet-group.com/.well-known/agent-skills/index.json` | JSON | Index of available agent skills |
| `https://gauntlet-group.com/.well-known/ai-catalog.json` | JSON | AI catalog of agent resources |
| `https://gauntlet-group.com/.well-known/mcp/server-card.json` | JSON | MCP server card |
| `https://gauntlet-group.com/.well-known/api-catalog` | Linkset+JSON | API catalog with service descriptions and status |
| `https://gauntlet-group.com/api/mcp-openapi.json` | JSON | OpenAPI description of the MCP endpoint |
| `https://gauntlet-group.com/api/status.json` | JSON | Service status |

## How to Access

All of the above endpoints accept unauthenticated `GET` requests and return CORS-enabled responses. No credentials, headers, or pre-flight registration are needed.

## Contact

For questions about API access, contact `imran.ishaq@gauntlet-group.com`.
