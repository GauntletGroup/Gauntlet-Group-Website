# auth.md

## Gauntlet Group — Agent Registration

All agent-facing APIs and resources published by Gauntlet Group are **public** and require **no authentication, no access tokens, and no agent registration**.

### No OAuth / OIDC Provider

Gauntlet Group does not operate an OAuth or OIDC authorization server. No token issuance, no client registration, and no credential provisioning flow exists.

### Anonymous Access

Agents may access all published endpoints anonymously. No `Authorization` header is expected or checked on any endpoint.

### Public Agent-Facing Endpoints

| Endpoint | Description |
| --- | --- |
| `https://gauntlet-group.com/mcp` | MCP Server — services and inquiry skills |
| `https://gauntlet-group.com/.well-known/agent-skills/index.json` | Index of available agent skills |
| `https://gauntlet-group.com/.well-known/agent-skills.json` | Machine-readable organisation and services catalog |
| `https://gauntlet-group.com/.well-known/ai-catalog.json` | AI catalog of agent resources |
| `https://gauntlet-group.com/.well-known/mcp/server-card.json` | MCP server card |
| `https://gauntlet-group.com/.well-known/api-catalog` | API catalog (linkset+json) |
| `https://gauntlet-group.com/api/mcp-openapi.json` | OpenAPI description of the MCP endpoint |
| `https://gauntlet-group.com/api/status.json` | Service status |

All endpoints accept unauthenticated `GET` requests and return CORS-enabled responses.

### Contact

For questions about API access contact `imran.ishaq@gauntlet-group.com`.
