import http from "node:http";
import { Transform } from "node:stream";

// SERVER
// req => Readable Stream
// res => Writable Stream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStringContent = Buffer.concat(buffers).toString();
  console.log(fullStringContent);

  return res.end(fullStringContent);
});

server.listen(3334, () => {
  console.log("Server is running on port 3334");
});
