import { readData, writeData } from "./utils/data.js";
console.log("=== Lendo dados iniciais ===");
console.log(readData());
// Vamos adicionar um novo usuário
const data = readData();
data.users.push({ id: 3, name: "Be Publicidade" });
writeData(data);
console.log("=== Dados atualizados ===");
console.log(readData());
//# sourceMappingURL=testData.js.map