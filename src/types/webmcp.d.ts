// Type declarations for the WebMCP browser API.
// Spec: https://webmachinelearning.github.io/webmcp/
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

interface WebMCPToolAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
}

interface WebMCPTool {
  name: string;
  title?: string;
  description: string;
  inputSchema: WebMCPJSONSchema;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
  annotations?: WebMCPToolAnnotations;
}

interface WebMCPRegisterToolOptions {
  signal?: AbortSignal;
  exposedTo?: string[];
}

interface WebMCPRegisteredTool {
  name: string;
  title?: string;
  description: string;
  inputSchema?: string;
  window: Window;
  origin: string;
  annotations?: WebMCPToolAnnotations;
}

interface WebMCPGetToolOptions {
  includeDescendants?: boolean;
}

interface WebMCPModelContext {
  registerTool(
    tool: WebMCPTool,
    options?: WebMCPRegisterToolOptions,
  ): Promise<void>;
  getTools(options?: WebMCPGetToolOptions): Promise<WebMCPRegisteredTool[]>;
}

interface Navigator {
  modelContext?: WebMCPModelContext;
}
