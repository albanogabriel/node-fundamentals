import http from "node:http";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { json } from "./middleware/json.js";

const database = new Database();

// Utilizamos o conceito de leitura de streams para que consigamos ler todo o corpo da nossa requisição feita no insomnia(/post { name: 'Gabriel', email: 'albano@teste.com'})
// depois que estiver lido por completo, transformamos o corpo da requisição em um objeto JSON,
// e utilizamos esses dados na criação do usuário em POST /users

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert("users", user);

    return res.writeHead(201).end("Criação de usuários");
  }

  // Use createServer
  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
