// Type declarations for the WebMCP browser API.
// Spec: https://isitagentready.com/.well-known/agent-skills/webmcp/SKILL.md
// Allows a page to expose tools that in-browser AI agents can call.

interface WebMCPJSONSchemaProperty {
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'integer';
  description?: string;
  enum?: string[];
  items?: WebMCPJSONSchemaProperty;
  properties?: Record<string, WebMCPJSONSchemaProperty>;
  required?: string[];
}

interface WebMCPJSONSchema {
  type: 'object';
  properties: Record<string, WebMCPJSONSchemaProperty>;
  required?: string[];
}

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: WebMCPJSONSchema;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

interface WebMCPModelContext {
  provideContext(tools: WebMCPTool[]): Promise<void>;
}

interface Navigator {
  modelContext?: WebMCPModelContext;
}
