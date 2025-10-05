import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFilePath = join(__dirname, "../../data/userData.json");

// Lê o JSON
export function readData(): any {
  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContent);
}

// Escreve no JSON
export function writeData(newData: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf-8");
}

// Atualiza um usuário pelo ID
export function updateUser(id: number, updatedFields: Record<string, any>) {
  const data = readData();

  if (!Array.isArray(data.users)) {
    throw new Error("O arquivo JSON deve conter um array 'users'.");
  }

  // ✅ Verifica se há IDs duplicados e remove automaticamente
  const uniqueUsers = data.users.filter(
    (user: any, index: number, self: any[]) =>
      index === self.findIndex((u) => u.id === user.id)
  );

  const userIndex = uniqueUsers.findIndex((user: any) => user.id === id);

  if (userIndex === -1) {
    console.log(`⚠️ Usuário com id ${id} não encontrado.`);
    return null;
  }

  // ✏️ Atualiza os campos (adiciona novos se não existirem)
  const updatedUser = {
    ...uniqueUsers[userIndex],
    ...updatedFields,
  };

  uniqueUsers[userIndex] = updatedUser;

  // 💾 Salva o JSON limpo e atualizado
  writeData({ users: uniqueUsers });

  console.log(`✅ Usuário com id ${id} atualizado com sucesso.`);
  return updatedUser;


}
