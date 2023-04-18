const fs = require("fs");
const http = require("http");
const url = require("url");
// No require pode-se usar a notação ./diretório
const replaceTemplate = require("./modules/replaceTemplate");

// Lê apenas uma vez, pra não ficar fazendo isso toda vez que houver um request.
//Um código top level só é executado quando começamos o programa.
// ./arquivo não é a melhor prática para simbolizar arquivos no mesmo diretório
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // Desestruturação
  const { query, pathname } = url.parse(req.url, true);

  // Muda a resposta de acordo com o valor passado pela URL
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname == "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname == "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data); // Transforma o JSON em um objeto javascript array
    //   console.log(productData);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    // });
    // res.writeHead(200, { "Content-type": "text/html" });
    // res.end(tempOverview);
  } else {
    // Header deve ser declarado antes da resposta
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Meu header!!",
    });
    /* Código de página não encontrada. Pode ser verificado no DevTools em Console ou Rede. 
    Em rede (Network), clique no nome da página, em vermelho, e verifique os cabeçalhos de resposta */

    res.end("Página não encontrada!");
  }
});

// Escutar na porta 8000 do localhost
server.listen(8000, "127.0.0.1", () => {
  console.log("Servidor funcionando!");
});
