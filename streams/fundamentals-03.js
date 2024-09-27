// STREAM - setTimeOut(() => {}, [1000])

import { Readable } from "node:stream";

// ❯ node streams/fundamentals-03.js
// a cada 1 segundo ele vai imprimindo com o process.stdout
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11 ........12131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100%

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

new OneToHundredStream().pipe(process.stdout);
