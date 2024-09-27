// WRITABLE STREAMS and TRANSFORM STREAMS

// vai receber dados de uma stream de leitura(readable), vai tranformar dados com uma stream de tranformação(Transform) e depois vai fazer um console.log() com uma stream de escrita(Writable)

import { Readable, Writable, Transform } from "node:stream";

// READABLE STREAM
// A streams diferente de um dado tradicional, eu consigo, aos poucos(a cada 1 segundo), trabalhar com os dados retornados de dentro de uma stream
// já consigo mostrar dados/processar dados de dentro da minha stream, mesmo antes da minha stream estar completa

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

// TRANSFORM STREAM
// Transformando um dado em outro
// diferença entra transform x writable stream: ao invés de dar um console.log, vou pegar o dado da mesma forma

// callback
// 1º Param(null) - é um erro, ou validação de erro
// 2º Param(tranformed) - dado transformado

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

// WRITABLE STREAM
// dentro de uma stream de escrita, a gente não retorna nada, a gente processa o dado, nunca vai transformar o dado em alguma outra coisa, apenas vai processar o dado em alguma outra coisa

// _write
// chunk - pedaço que a gente leu da stream de leitura(neste caso const buf = Buffer.from(String(i)))
// encoding - como esta informação está codificada - mais pra frente veremos
// callback - função que a stream de escrita precisa chamar quando ela terminou de fazer com aquela informação

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream() // ler dados
  .pipe(new InverseNumberStream()) // inventer para negativo
  .pipe(new MultiplyByTenStream()); // escrever dados
