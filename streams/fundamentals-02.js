// STREAM - Criar uma stream Readable do zero

// irá imprimir de uma vez só
// ❯ node streams/fundamentals-02.js
// 123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100%

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(String(i));
      this.push(buf);
    }
  }
}

new OneToHundredStream().pipe(process.stdout);
