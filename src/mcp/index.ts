    import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
    import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
    import { registerTools } from "./tools.js";
    import { registerResources } from "./resources.js";
    import { registerPrompts } from "./prompts.js";

    // 🧠 Cria instância do servidor MCP
    const server = new McpServer({
    name: "user-data-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
        resources: {},
        prompts: {},
    }
    });

    // 🔧 Registra ferramentas (ações)
    registerTools(server);

    // 🗂️ Registra recursos (dados)
    registerResources(server);

    // 💬 Registra prompts (mensagens predefinidas)
    registerPrompts(server);

    // 🚀 Inicializa o servidor com tratamento de erro
    async function startServer() {
    try {
        // ✅ CORREÇÃO: Usar StdioServerTransport
        const transport = new StdioServerTransport();
        await server.connect(transport);
        
        console.error("🚀 MCP Server running successfully via STDIO!");
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
    }

    startServer();