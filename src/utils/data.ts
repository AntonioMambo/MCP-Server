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

  // 🧩 Garante que data.users existe e é um array
  if (!Array.isArray(data.users)) {
    throw new Error("O arquivo JSON deve conter um array 'users'.");
  }

  // 🔍 Procura o usuário pelo id
  const userIndex = data.users.findIndex((user: any) => user.id === id);

  if (userIndex === -1) {
    console.log(`⚠️ Usuário com id ${id} não encontrado.`);
    return null;
  }

  // ✏️ Atualiza os campos (inclusive adiciona novos, se não existirem)
  const updatedUser = {
    ...data.users[userIndex],
    ...updatedFields,
  };

  // ✅ Substitui o usuário no array original
  data.users[userIndex] = updatedUser;

  // 💾 Salva no arquivo
  writeData(data);

  console.log(`✅ Usuário com id ${id} atualizado com sucesso.`);
  return updatedUser;
}
