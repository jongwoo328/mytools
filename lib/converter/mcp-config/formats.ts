export type EditorType =
  | "claude-desktop"
  | "vscode"
  | "cursor"
  | "opencode"
  | "gemini-cli"
  | "codex-cli"
  | "claude-code"
  | "antigravity";

type ClaudeDesktopMcpServer = {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
};
export type ClaudeDesktopConfig = {
  mcpServers: Record<string, ClaudeDesktopMcpServer>;
};

type VSCodeMcpServer = {
  type?: "stdio" | "http" | "sse";
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  envFile?: string;
  cwd?: string;
  url?: string;
  headers?: Record<string, string>;
};

export interface VSCodeConfig {
  inputs?: Array<{
    type: string;
    id: string;
    description: string;
    password?: boolean;
  }>;
  servers: Record<string, VSCodeMcpServer>;
}

type CursorMcpServer = {
  disabled?: boolean;
  autoApprove?: string[];
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
};
export type CursorConfig = {
  mcpServers: Record<string, CursorMcpServer>;
};

type OpenCodeMcpServer = {
  type?: "local" | "remote";
  command?: string | string[];
  args?: string[];
  env?: Record<string, string>;
  environment?: Record<string, string>;
  cwd?: string;
  url?: string;
  headers?: Record<string, string>;
  enabled?: boolean;
  debug?: boolean;
};

export type OpenCodeConfig = {
  mcp: Record<string, OpenCodeMcpServer>;
};

type GeminiMcpServer = {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
  url?: string;
  httpUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  trust?: boolean;
  includeTools?: string[];
  excludeTools?: string[];
};

export type GeminiCliConfig = {
  mcpServers: Record<string, GeminiMcpServer>;
};

type CodexMcpServer = {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
  url?: string;
  startup_timeout_sec?: number;
};
export type CodexCliConfig = {
  mcp_servers: Record<string, CodexMcpServer>;
};

type ClaudeCodeMcpServer = {
  type?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  headers?: Record<string, string>;
};
export type ClaudeCodeConfig = {
  mcpServers: Record<string, ClaudeCodeMcpServer>;
  allowedMcpServers?: string[];
  deniedMcpServers?: string[];
};

// Universal intermediate format for conversion
export type UniversalMcpServer = {
  name: string;
  transport: "stdio" | "http" | "sse";
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
  url?: string;
  headers?: Record<string, string>;
  timeout?: number;
};

export type UniversalConfig = {
  servers: UniversalMcpServer[];
};

type AntigravityMcpServer = {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  serverUrl?: string;
  headers?: Record<string, string>;
};
export type AntigravityConfig = {
  mcpServers: Record<string, AntigravityMcpServer>;
};
