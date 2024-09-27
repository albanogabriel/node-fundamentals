// O Buffer

// É uma representação de um espaço na memória do computador, usado específicamente para transitar dados de uma maneira muito rápida
// Os dados armazenados no Buffer, para logo serem tratados, ou seja, enviados para um outro lugar e logo removidos
// São maneira da gente conseguir salvar e ler da memória, de uma maneira muito performática,

// O node usa muito esse modelo na leitura e na escrita de streams, porque é mais performático ler parcialmente uma informação de forma binária(forma que o buffer guarda a informação na memória), do que necessáriamente um texto, uma string(acentos, tios, coisas que precisamos guarda com coding muito mais pesado para ser lido)
// Buffer é um api criada no node por causa específicamente da incapacidade do JavaScript, de trabalhar com dados binários e maneiras eficientes. O JavaScript por muito tempo, nunca teve, uma forma nativa de trabalhar com dados binários(hoje até tem com uma api chamada TypedArray, porém ela ainda não é utilizada na grande maioria)

// O Buffer é uma maneira mais eficiente e performática para a gente ler e escrever da memória, conversando de uma maneira binárias, de baixo nível, para não precisar ler ou escrever da memória, com uma maneira de mais alto nível(com textos, etc.)

const buf = Buffer.from("hello");
console.log(buf);

// ❯ node streams/buffer.js
// <Buffer 68 65 6c 6c 6f>

const buf2 = Buffer.from("hello");
console.log(buf2.toJSON());
// { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }
