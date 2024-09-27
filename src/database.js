import fs from "node:fs/promises";

// localização do nosso arquivo de banco de dados está relativa ao arquivo database.js
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    // ler o arquivo
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      //caso n exista o arquivo
      .catch(() => {
        // só criará o arquivo
        this.#persist();
      });
  }

  // deixar dados salvos em arquivo físico
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
