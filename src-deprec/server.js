import http from "node:http";

const users = [];

// Utilizamos o conceito de leitura de streams para que consigamos ler todo o corpo da nossa requisição feita no insomnia(/post { name: 'Gabriel', email: 'albano@teste.com'})
// depois que estiver lido por completo, transformamos o corpo da requisição em um objeto JSON,
// e utilizamos esses dados na criação do usuário em POST /users

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end("Criação de usuários");
  }

  // Use createServer
  return res.setHeader("Content-type", "application/json").writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
