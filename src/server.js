import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";

// Query Parameters: URL Stateful
// Route Parameters: Identificação de recurso
// Request body: Envio de informações de um formulário

// https://localhost:3333/users?userId=1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups }; // taticazinha para remover o [ object null protoype e retornar nosso id dinâmico]

    return route.handler(req, res);
  }

  console.log(route);

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
