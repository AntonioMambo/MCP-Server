import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, "../../data/userData.json");
export function readData() {
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
}
export function writeData(newData) {
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf-8");
}
//# sourceMappingURL=data.js.map