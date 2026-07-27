---
name: gauntlet-services
description: Discover and explore Gauntlet Group's IT automation services (alert triage, helpdesk automation, onboarding, AI assistants, custom workflows, IT asset disposal) via the MCP server. Use when a user asks what Gauntlet Group offers or wants details on a specific service.
---

# Gauntlet Group Service Catalog

Gauntlet Group designs and implements AI-powered IT automations for growing businesses in the UK.

## How to discover services

Connect to the MCP server at `https://gauntlet-group.com/mcp` using the Streamable HTTP transport (POST requests only).

### List all services

Call the `list_services` tool (no arguments) to get every service name and a short description.

### Get details for a service

Call the `get_service_details` tool with the `serviceName` argument. Valid values:

- AI Alert Triage
- IT Helpdesk Automation
- Employee Onboarding
- AI Support Assistants
- Custom Workflows
- WEEE & IT Asset Disposal

The response includes overview points, integrations, and a step-by-step "how it works" breakdown.

### Get organization info

Call the `get_organization_info` tool (no arguments) for contact details, service area, hours, and compliance certifications.

## When to use this skill

- A user asks "what does Gauntlet Group do?"
- A user wants to compare or get details on a specific automation service
- A user needs contact info or compliance details for Gauntlet Group

## Notes

- The MCP server is public — no authentication required.
- Service area: United Kingdom.
- Hours: Mon-Fri 09:00-17:00 GMT.
- Compliance: ISO 27701 certified, GDPR compliant.
