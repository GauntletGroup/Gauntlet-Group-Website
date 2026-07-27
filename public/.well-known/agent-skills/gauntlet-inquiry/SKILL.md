---
name: gauntlet-inquiry
description: Submit a contact inquiry to Gauntlet Group on behalf of a visitor via the MCP server. Use when a user wants to contact Gauntlet Group, request a callback, or ask about their automation services.
---

# Submit a Contact Inquiry to Gauntlet Group

Use the Gauntlet Group MCP server to send a contact inquiry on a visitor's behalf.

## Endpoint

Connect to the MCP server at `https://gauntlet-group.com/mcp` using the Streamable HTTP transport (POST requests only).

## Tool: send_inquiry

Call the `send_inquiry` tool with these arguments:

### Required fields

- `firstName` (string) — Visitor's first name
- `lastName` (string) — Visitor's last name
- `email` (string) — Valid email address
- `message` (string) — The inquiry message, minimum 10 characters

### Optional fields

- `phoneNumber` (string) — Contact phone number
- `company` (string) — Company name

## Validation rules

- All four required fields must be non-empty after trimming.
- The email must match a standard email pattern.
- The message must be at least 10 characters after trimming.

## Response

On success, the tool returns a confirmation that Gauntlet Group will respond within one working day.

On failure, the tool returns an error message. If the server is not configured to accept inquiries, direct the user to the contact form at `https://gauntlet-group.com/#contact`.

## When to use this skill

- A user says "contact Gauntlet Group" or "get in touch"
- A user wants a callback or consultation
- A user asks to book a free automation review

## Alternative contact methods

- Email: imran.ishaq@gauntlet-group.com
- Phone: +44 7800 721443
- Book a call: https://calendly.com/imran-ishaq-gauntlet-group/30min
- Contact form: https://gauntlet-group.com/#contact
