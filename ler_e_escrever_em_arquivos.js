const fs = require("fs");

// Modo síncrono de leitura de dados
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}\n${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
