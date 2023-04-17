const http = require("http");
// const url = require("url");

const server = http.createServer((req, res) => {
  //console.log(req);
  const pathName = req.url;

  // Muda a resposta de acordo com o valor passado pela URL
  if (pathName == "/overview") res.end("Página Overview");
  else if (pathName == "/product") res.end("Página Product");
  else {
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
