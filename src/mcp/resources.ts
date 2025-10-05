// Recursos (somente leitura)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readData } from "../utils/data.js";

export function registerResources(server: McpServer) {
  // Recurso que fornece os dados dos usuários
  server.resource("users", "Lista atual de usuários", async () => {
    const data = readData();
    return data.users;
  });

  // Exemplo de recurso estático
//   server.resource("info", "Informações gerais do sistema", async () => {
//     return {
//       system: "User Data MCP Server",
//       version: "1.0.0",
//       description: "Servidor MCP que gerencia dados de usuários via JSON",
//     };
//   });
}
