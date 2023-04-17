const fs = require("fs");

// Modo assíncrono de leitura de dados
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

console.log("Iniciando 1..."); // Vai ser executado primeiro

// ---------------------------------------------------------------------------------

// Modo assíncrono de leitura de dados
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log(`Erro!!`);

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Arquivo pronto!");
      });
    });
  });
});

console.log("Iniciando 2..."); // Vai ser executado primeiro
