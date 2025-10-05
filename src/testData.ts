import { readData, writeData, updateUser } from "./utils/data.js";

// console.log("=== Lendo dados iniciais ===");
// console.log(readData());

// // Vamos adicionar um novo usuário
// const data = readData();
// data.users.push({ id: 3, name: "Be Publicidade" });

// writeData(data);

// console.log("=== Dados atualizados ===");
// console.log(readData());

// console.log("=== Antes da atualização ===");
// console.log(readData());

// Atualiza o nome e email do usuário com id 1
updateUser(3, { email: "be@bepublicidade.co.mz" });

console.log("=== Depois da atualização ===");
console.log(readData());
