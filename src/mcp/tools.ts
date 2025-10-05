import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readData, updateUser, writeData } from "../utils/data.js";

// Função que registra as tools disponíveis
export function registerTools(server: McpServer) {
  // Tool para listar todos os usuários
  server.tool(
    "listUsers",
    "Lista todos os usuários",
    {}, //Schema vazio não recebe parâmetros
    async () => {
      try {
        const data = readData();
        return {
          content: [
            {
              type: "text",
              text: `Usuários encontrados: ${
                data.users.length
              }\n\n${JSON.stringify(data.users, null, 2)}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Erro ao listar usuários: ${
                error instanceof Error ? error.message : "Erro desconhecido"
              }`,
            },
          ],
        };
      }
    }
  );

  // 2️⃣ Tool para criar um novo usuário
  server.tool(
    "createUser",
    "Cria um novo usuário no sistema",
    {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Nome completo do usuário",
        },
        email: {
          type: "string",
          description: "Email único do usuário",
        },
        role: {
          type: "string",
          description: "Cargo/função do usuário",
          optional: true,
        },
      },
      required: ["name", "email"],
    },
    async (input) => {
      try {
        const { name, email, role } = input;

        const newUser = writeData({
          name,
          email,
          role: role || "user",
        });

        return {
          content: [
            {
              type: "text",
              text: `✅ Usuário criado com sucesso!\n\n${JSON.stringify(
                newUser,
                null,
                2
              )}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Erro ao listar usuários: ${
                error instanceof Error ? error.message : "Erro desconhecido"
              }`,
            },
          ],
        };
      }
    }
  );

  // 3️⃣ Tool para atualizar um usuário
  server.tool(
    "updateUser",
    "Atualiza dados de um usuário existente",
    {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "ID do usuário",
        },
        name: {
          type: "string",
          description: "Novo nome do usuário",
          optional: true,
        },
        email: {
          type: "string",
          description: "Novo email do usuário",
          optional: true,
        },
        role: {
          type: "string",
          description: "Novo cargo/função do usuário",
          optional: true,
        },
      },
      required: ["id"],
    },
    async (input) => {
      try {
        const { id, ...fields } = input;

        // ✅ Validação adicional
        if (Object.keys(fields).length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Erro: Nenhum campo fornecido para atualização. Forneça name, email ou role.",
              },
            ],
          };
        }

        const updated = updateUser(Number(id), fields);

        return {
          content: [
            {
              type: "text",
              text: `✅ Usuário atualizado com sucesso!\n\n${JSON.stringify(
                updated,
                null,
                2
              )}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Erro ao listar usuários: ${
                error instanceof Error ? error.message : "Erro desconhecido"
              }`,
            },
          ],
        };
      }
    }
  );

  // 4️⃣ Tool para deletar um usuário (OPCIONAL)
  server.tool(
    "deleteUser",
    "Remove um usuário do sistema",
    {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "ID do usuário a ser removido",
        },
      },
      required: ["id"],
    },
    async (input) => {
      try {
        const { id } = input;
        // 🔄 Você precisaria implementar a função deleteUser em data.js
        // const result = deleteUser(Number(id));

        return {
          content: [
            {
              type: "text",
              text: `⚠️ Funcionalidade de deletar usuário ainda não implementada. ID recebido: ${id}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Erro ao listar usuários: ${
                error instanceof Error ? error.message : "Erro desconhecido"
              }`,
            },
          ],
        };
      }
    }
  );
}
