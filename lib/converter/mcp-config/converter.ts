import type {
  EditorType,
  UniversalConfig,
  UniversalMcpServer,
  ClaudeDesktopConfig,
  ClaudeCodeConfig,
  AntigravityConfig,
  CursorConfig,
  OpenCodeConfig,
  VSCodeConfig,
  GeminiCliConfig,
  CodexCliConfig,
} from "./fotmats";
import * as TOML from "@iarna/toml";
import { parseJsonFlexible } from "./util";
import type { Composer } from "vue-i18n";

export function parseToUniversal(config: unknown, sourceFormat: EditorType): UniversalConfig {
  const servers: UniversalMcpServer[] = [];

  switch (sourceFormat) {
    case "claude-desktop": {
      const cfg = config as ClaudeDesktopConfig;
      for (const [name, server] of Object.entries(cfg.mcpServers || {})) {
        servers.push({
          name,
          transport: server.url ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          url: server.url,
          headers: server.headers,
        });
      }
      break;
    }

    case "claude-code": {
      const cfg = config as ClaudeCodeConfig;
      for (const [name, server] of Object.entries(cfg.mcpServers || {})) {
        servers.push({
          name,
          transport: server.url ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          url: server.url,
          headers: server.headers,
        });
      }
      break;
    }

    case "antigravity": {
      const cfg = config as AntigravityConfig;
      for (const [name, server] of Object.entries(cfg.mcpServers || {})) {
        servers.push({
          name,
          transport: server.serverUrl ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          url: server.serverUrl,
          headers: server.headers,
        });
      }
      break;
    }

    case "cursor": {
      const cfg = config as CursorConfig;
      for (const [name, server] of Object.entries(cfg.mcpServers || {})) {
        servers.push({
          name,
          transport: server.url ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          url: server.url,
          headers: server.headers,
        });
      }
      break;
    }

    case "vscode": {
      const cfg = config as VSCodeConfig;
      for (const [name, server] of Object.entries(cfg.servers || {})) {
        servers.push({
          name,
          transport: server.type || (server.url ? "http" : "stdio"),
          command: server.command,
          args: server.args,
          env: server.env,
          cwd: server.cwd,
          url: server.url,
          headers: server.headers,
        });
      }
      break;
    }

    case "opencode": {
      const cfg = config as OpenCodeConfig;
      for (const [name, server] of Object.entries(cfg.mcp || {})) {
        // Handle command as array (OpenCode uses ["uvx", "perplexica-mcp", "stdio"])
        let command: string | undefined;
        let args: string[] | undefined;

        if (Array.isArray(server.command)) {
          command = server.command[0];
          args = server.command.slice(1);
        } else if (typeof server.command === "string") {
          command = server.command;
          args = server.args;
        }

        // Handle both "env" and "environment" keys
        const env = server.env || server.environment;

        servers.push({
          name,
          transport: server.type === "remote" || server.url ? "http" : "stdio",
          command,
          args,
          env,
          cwd: server.cwd,
          url: server.url,
          headers: server.headers,
        });
      }
      break;
    }

    case "gemini-cli": {
      const cfg = config as GeminiCliConfig;
      for (const [name, server] of Object.entries(cfg.mcpServers || {})) {
        servers.push({
          name,
          transport: server.url || server.httpUrl ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          cwd: server.cwd,
          url: server.url || server.httpUrl,
          headers: server.headers,
          timeout: server.timeout,
        });
      }
      break;
    }

    case "codex-cli": {
      const cfg = config as CodexCliConfig;
      for (const [name, server] of Object.entries(cfg.mcp_servers || {})) {
        servers.push({
          name,
          transport: server.url ? "http" : "stdio",
          command: server.command,
          args: server.args,
          env: server.env,
          cwd: server.cwd,
          url: server.url,
          // Convert startup_timeout_sec (seconds) to timeout (milliseconds)
          ...(server.startup_timeout_sec && { timeout: server.startup_timeout_sec * 1000 }),
        });
      }
      break;
    }
  }

  return { servers };
}

// Convert universal format to target format
export function convertFromUniversal(universal: UniversalConfig, targetFormat: EditorType): unknown {
  switch (targetFormat) {
    case "claude-desktop": {
      const result: ClaudeDesktopConfig = { mcpServers: {} };
      for (const server of universal.servers) {
        result.mcpServers[server.name] = {
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.url && { url: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
        };
      }
      return result;
    }

    case "claude-code": {
      const result: ClaudeCodeConfig = { mcpServers: {} };
      const serverNames: string[] = [];

      for (const server of universal.servers) {
        serverNames.push(server.name);

        // Determine type based on transport/properties
        let type = "stdio";
        if (server.transport === "sse") type = "sse";
        else if (server.transport === "http" || server.url) type = "http";

        result.mcpServers[server.name] = {
          type,
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.url && { url: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
        };
      }
      // Automatically add all servers to allowed list for better UX
      result.allowedMcpServers = serverNames;
      return result;
    }

    case "cursor": {
      const result: CursorConfig = { mcpServers: {} };
      for (const server of universal.servers) {
        result.mcpServers[server.name] = {
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.url && { url: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
        };
      }
      return result;
    }

    case "vscode": {
      const result: VSCodeConfig = { servers: {} };
      for (const server of universal.servers) {
        result.servers[server.name] = {
          ...(server.transport !== "stdio" && { type: server.transport }),
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.cwd && { cwd: server.cwd }),
          ...(server.url && { url: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
        };
      }
      return result;
    }

    case "opencode": {
      const result: OpenCodeConfig = { mcp: {} };
      for (const server of universal.servers) {
        const isRemote = server.transport !== "stdio" || !!server.url;
        if (isRemote) {
          result.mcp[server.name] = {
            type: "remote" as const,
            url: server.url,
            ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
            enabled: true,
          };
        } else {
          // OpenCode uses command as array: ["command", ...args]
          const commandArray = server.command ? [server.command, ...(server.args || [])] : undefined;
          result.mcp[server.name] = {
            type: "local" as const,
            ...(commandArray && { command: commandArray }),
            ...(server.env && Object.keys(server.env).length && { environment: server.env }),
            ...(server.cwd && { cwd: server.cwd }),
            enabled: true,
          };
        }
      }
      return result;
    }

    case "gemini-cli": {
      const result: GeminiCliConfig = { mcpServers: {} };
      for (const server of universal.servers) {
        result.mcpServers[server.name] = {
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.cwd && { cwd: server.cwd }),
          // Gemini supports both 'url' and 'httpUrl' - use 'url' as primary
          ...(server.url && { url: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
          ...(server.timeout && { timeout: server.timeout }),
        };
      }
      return result;
    }

    case "antigravity": {
      const result: AntigravityConfig = { mcpServers: {} };
      for (const server of universal.servers) {
        result.mcpServers[server.name] = {
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.url && { serverUrl: server.url }),
          ...(server.headers && Object.keys(server.headers).length && { headers: server.headers }),
        };
      }
      return result;
    }

    case "codex-cli": {
      const result: CodexCliConfig = { mcp_servers: {} };
      for (const server of universal.servers) {
        result.mcp_servers[server.name] = {
          ...(server.command && { command: server.command }),
          ...(server.args?.length && { args: server.args }),
          ...(server.env && Object.keys(server.env).length && { env: server.env }),
          ...(server.cwd && { cwd: server.cwd }),
          ...(server.url && { url: server.url }),
          // Convert timeout (milliseconds) to startup_timeout_sec (seconds)
          ...(server.timeout && { startup_timeout_sec: Math.round(server.timeout / 1000) }),
        };
      }
      return result;
    }
  }
}

export function createConverter(i18n: Composer) {
  const { t } = i18n;
  return function convertConfig(
    inputConfig: string,
    sourceFormat: EditorType,
    targetFormat: EditorType,
  ): { success: true; output: string; serverCount: number } | { success: false; error: string } {
    try {
      let parsed: unknown;

      // Parse input based on source format
      if (sourceFormat === "codex-cli") {
        // Codex CLI uses TOML
        try {
          parsed = TOML.parse(inputConfig);
        } catch {
          throw new Error(t("converter.mcp-config.message.codex_cli_invalid_toml"));
        }
      } else {
        // All other formats use JSON
        try {
          parsed = parseJsonFlexible(inputConfig);
        } catch {
          throw new Error(t("converter.mcp-config.message.invalid_json_format"));
        }
      }

      const universal = parseToUniversal(parsed, sourceFormat);

      if (universal.servers.length === 0) {
        return {
          success: false,
          error: t("converter.mcp-config.message.no_mcp_server_config_found"),
        };
      }

      const converted = convertFromUniversal(universal, targetFormat);

      // Format output based on target format
      let output: string;
      if (targetFormat === "codex-cli") {
        // Codex CLI uses TOML
        output = TOML.stringify(converted as TOML.JsonMap);
      } else {
        // All other formats use JSON
        output = JSON.stringify(converted, null, 2);
      }

      return {
        success: true,
        output,
        serverCount: universal.servers.length,
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : t("converter.mcp-config.message.unknown_error"),
      };
    }
  };
}
