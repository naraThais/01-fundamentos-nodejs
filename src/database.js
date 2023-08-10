import fs from 'node:fs/promises';
import path from 'node:path';

const databasePath = path.resolve(path.join('./', 'db.json'));
console.log(databasePath);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            });
    }

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
