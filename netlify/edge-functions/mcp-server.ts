// Netlify Edge Function — MCP Server (Streamable HTTP transport)
// Implements a minimal MCP server that exposes Gauntlet Group's service catalog
// and accepts contact inquiries. Discovered via the MCP Server Card at
// /.well-known/mcp/server-card.json

interface MCPRequest {
  jsonrpc: "2.0";
  id: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

interface MCPResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, ETag",
};

const SERVER_INFO = {
  name: "com.gauntlet-group/mcp",
  version: "1.0.0",
};

const PROTOCOL_VERSION = "2025-06-18";

const SERVICES = [
  {
    name: "AI Alert Triage",
    description: "Automated triage and routing of IT alerts in roughly 3 seconds end-to-end.",
    overview: [
      { title: "AI Incident Summary", desc: "Technical alerts translated into plain English your whole team can act on." },
      { title: "Severity Classification", desc: "Critical, Medium, and Low urgency auto-assigned by configurable rules." },
      { title: "Smart Routing", desc: "Critical alerts hit Teams and email instantly. Lower-severity events are logged or batched." },
      { title: "Audit Logging", desc: "Every alert, classification, and notification recorded for compliance." },
    ],
    integrations: ["Azure Monitor", "Microsoft Teams", "Outlook", "Slack", "Jira Service Mgmt", "Google Gemini", "PagerDuty", "ServiceNow"],
    howItWorks: [
      { step: "Alert received", desc: "Monitoring sends alert via webhook." },
      { step: "AI triages", desc: "Gemini summarises and classifies severity." },
      { step: "Notify & log", desc: "Critical → Teams/email. All logged." },
    ],
  },
  {
    name: "IT Helpdesk Automation",
    description: "Automated handling of common helpdesk requests such as password resets.",
    overview: [
      { title: "Password resets", desc: "Self-service form → Azure reset → email. Zero IT involvement." },
      { title: "Ticket classification", desc: "Auto-categorised by type and urgency." },
      { title: "Access requests", desc: "Form → validation → approver notification." },
      { title: "AI knowledge base", desc: "Common questions answered before a ticket is raised." },
    ],
    integrations: [],
    howItWorks: [
      { step: "Request submitted", desc: "Staff fills a self-service form." },
      { step: "Workflow executes", desc: "n8n authenticates, performs action." },
      { step: "User notified & logged", desc: "Instant email. Full audit trail." },
    ],
  },
  {
    name: "Employee Onboarding",
    description: "Automated onboarding of new starters — accounts, access, and welcome email ready on day one.",
    overview: [
      { title: "Azure AD account", desc: "Created automatically from form data." },
      { title: "Welcome email", desc: "Credentials + first-day info sent instantly." },
      { title: "IT notification", desc: "Onboarding checklist sent to IT team." },
      { title: "Duplicate detection", desc: "Catches failures and alerts IT immediately." },
    ],
    integrations: [],
    howItWorks: [
      { step: "Manager submits form", desc: "Name, email, department, start date." },
      { step: "Account created", desc: "Azure AD via Graph API in seconds." },
      { step: "Notifications sent", desc: "Welcome email + IT checklist + audit log." },
    ],
  },
  {
    name: "AI Support Assistants",
    description: "RAG-based AI assistants that answer questions from your own documentation, available 24/7.",
    overview: [
      { title: "Trained on your docs", desc: "Answers from your content, not generic AI." },
      { title: "Multi-platform", desc: "Teams, Slack, web, or custom portal." },
      { title: "Escalation routing", desc: "Can't answer? Routes to a human. No dead ends." },
      { title: "Usage analytics", desc: "See what people ask. Find knowledge gaps." },
    ],
    integrations: [],
    howItWorks: [],
  },
  {
    name: "Custom Workflows",
    description: "Bespoke automation of any process that involves copying data or waiting for a human.",
    overview: [
      { title: "CRM & Sales", desc: "Lead capture → CRM → follow-up. No manual entry." },
      { title: "Finance", desc: "Scheduled reports, auto-distributed." },
      { title: "HR & People", desc: "Absence requests, approvals, system updates." },
      { title: "IT Operations", desc: "Patch notifications, asset tracking, licence audits." },
    ],
    integrations: [],
    howItWorks: [],
  },
  {
    name: "WEEE & IT Asset Disposal",
    description: "Secure, certified, zero-to-landfill IT asset recycling and disposal.",
    overview: [
      { title: "Zero Cost Disposal", desc: "No-charge collection & logistics for qualifying tech assets." },
      { title: "Asset Recovery", desc: "Reclaim value from retired equipment with smart components." },
      { title: "IT Refurbishment", desc: "Extend hardware lifecycles and reduce carbon emissions." },
      { title: "Nationwide Collection", desc: "Fully tracked collection from any UK site." },
    ],
    integrations: [],
    howItWorks: [],
  },
];

const TOOL_DEFINITIONS = [
  {
    name: "list_services",
    description: "List all services offered by Gauntlet Group with names and short descriptions.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_service_details",
    description: "Get detailed information about a specific service, including overview points, integrations, and how it works.",
    inputSchema: {
      type: "object",
      properties: {
        serviceName: {
          type: "string",
          description: "The exact service name (e.g. \"AI Alert Triage\")",
          enum: SERVICES.map((s) => s.name),
        },
      },
      required: ["serviceName"],
    },
  },
  {
    name: "get_organization_info",
    description: "Get information about Gauntlet Group including contact details, service area, hours, and compliance certifications.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "send_inquiry",
    description: "Submit a contact inquiry on behalf of a visitor. Requires at least firstName, lastName, email, and message.",
    inputSchema: {
      type: "object",
      properties: {
        firstName: { type: "string", description: "First name (required)" },
        lastName: { type: "string", description: "Last name (required)" },
        email: { type: "string", description: "Email address (required)" },
        message: { type: "string", description: "The inquiry message (required, min 10 chars)" },
        phoneNumber: { type: "string", description: "Contact phone number (optional)" },
        company: { type: "string", description: "Company name (optional)" },
      },
      required: ["firstName", "lastName", "email", "message"],
    },
  },
];

function jsonResponse(body: MCPResponse, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<{ content: { type: string; text: string }[]; isError?: boolean }> {
  const text = (s: string) => [{ type: "text", text: s }];

  switch (name) {
    case "list_services":
      return { content: text(JSON.stringify(SERVICES.map((s) => ({ name: s.name, description: s.description })), null, 2)) };

    case "get_service_details": {
      const service = SERVICES.find((s) => s.name === args.serviceName);
      if (!service) return { content: text("Service not found"), isError: true };
      return { content: text(JSON.stringify(service, null, 2)) };
    }

    case "get_organization_info":
      return {
        content: text(JSON.stringify({
          name: "Gauntlet Group",
          url: "https://gauntlet-group.com/",
          description: "Gauntlet Group designs and implements AI-powered IT automations for growing businesses.",
          contact: {
            email: "imran.ishaq@gauntlet-group.com",
            phone: "+44-7800-721443",
            linkedin: "https://www.linkedin.com/company/gauntlet-group",
          },
          serviceArea: "GB",
          hours: "Mon-Fri 09:00-17:00 GMT",
          compliance: { certifications: ["ISO 27701"], privacy: "GDPR compliant" },
        }, null, 2)),
      };

    case "send_inquiry": {
      const required = ["firstName", "lastName", "email", "message"];
      for (const field of required) {
        if (!args[field] || String(args[field]).trim().length === 0) {
          return { content: text(`Missing required field: ${field}`), isError: true };
        }
      }
      if (String(args.message).trim().length < 10) {
        return { content: text("Message must be at least 10 characters"), isError: true };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(args.email).trim())) {
        return { content: text("Invalid email address"), isError: true };
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

      if (!supabaseUrl || !supabaseServiceKey) {
        return { content: text("Server is not configured to accept inquiries. Please use the contact form at https://gauntlet-group.com/#contact instead."), isError: true };
      }

      try {
        const inquiryData = {
          name: `${args.firstName} ${args.lastName}`,
          email: String(args.email),
          contact_number: (args.phoneNumber as string) || null,
          company: (args.company as string) || null,
          message: String(args.message),
        };

        const resp = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseServiceKey,
            "Authorization": `Bearer ${supabaseServiceKey}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify(inquiryData),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          console.error("Supabase insert failed:", resp.status, errText);
          return { content: text("Failed to submit inquiry. Please try the contact form at https://gauntlet-group.com/#contact instead."), isError: true };
        }

        return { content: text("Inquiry submitted successfully. Gauntlet Group will respond within one working day.") };
      } catch (err) {
        console.error("Inquiry submission error:", err);
        return { content: text("Failed to submit inquiry due to a server error. Please try the contact form at https://gauntlet-group.com/#contact instead."), isError: true };
      }
    }

    default:
      return { content: text(`Unknown tool: ${name}`), isError: true };
  }
}

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method === "GET") {
    return new Response(JSON.stringify({
      jsonrpc: "2.0",
      error: { code: -32000, message: "This endpoint requires POST requests for MCP communication. Use a Streamable HTTP MCP client." },
    }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST", ...corsHeaders },
    });
  }

  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST, OPTIONS", ...corsHeaders } });
  }

  let body: MCPRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }

  const { id, method, params } = body;

  switch (method) {
    case "initialize": {
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          serverInfo: SERVER_INFO,
          capabilities: { tools: { listChanged: false } },
        },
      });
    }

    case "notifications/initialized": {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    case "tools/list": {
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: { tools: TOOL_DEFINITIONS },
      });
    }

    case "tools/call": {
      const toolName = params?.name as string;
      const toolArgs = (params?.arguments as Record<string, unknown>) || {};
      const result = await handleToolCall(toolName, toolArgs);
      return jsonResponse({ jsonrpc: "2.0", id, result });
    }

    case "ping": {
      return jsonResponse({ jsonrpc: "2.0", id, result: {} });
    }

    default:
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      });
  }
};
