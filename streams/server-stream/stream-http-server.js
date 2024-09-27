import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

// SERVER
// req => Readable Stream
// res => Writable Stream

const server = http.createServer((req, res) => {
  return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334, () => {
  console.log("Server is running on port 3334");
});
