// Streams
// pipe() - conectar streams

// process.stdin - o que for inserido na linha do terminal
// .pipe() - será encaminhado através de um pipe()
// .pipe(process.stout) - tudo que entrar será encaminhado para a saída com o process.stout

process.stdin.pipe(process.stdout);
