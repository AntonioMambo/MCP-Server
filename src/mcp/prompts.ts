import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerPrompts(server: McpServer) {
  // ✅ Método mais simples se disponível na sua versão
  server.prompt(
    "welcome",
    "Mensagem de boas-vindas",
    async () => {
      return {
        messages: [{
          role: "user",
          content: {
            type: "text", 
            text: "Olá! 👋 Eu sou o MCP Server da Be Publicidade. Posso listar usuários, atualizar perfis e muito mais!"
          }
        }]
      };
    }
  );

  server.prompt(
    "help", 
    "Ajuda geral",
    async () => {
      return {
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `
Comandos disponíveis:
- listUsers → lista todos os usuários.
- updateUser { id, name?, email? } → atualiza um usuário. 
- users (recurso) → consulta a lista de usuários.
            `.trim()
          }
        }]
      };
    }
  );
}