import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, "utf-8")
            .then((data) => {
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

    update(table, id, data) {
        const itemRow = this.#database[table].findIndex((row) => {
            return row.id === id;
        });

        if (itemRow > -1) {
            const { createdAt, completedAt } = this.#database[table][itemRow];
            const updatedAt = new Date();

            this.#database[table][itemRow] = {
                id,
                ...data,
                createdAt,
                completedAt,
                updatedAt,
            };

            this.#persist();
        }
    }

    delete(table, id) {
        const itemRow = this.#database[table].findIndex((row) => {
            return row.id === id;
        });

        if (itemRow > -1) {
            this.#database[table].splice(itemRow, 1);
            this.#persist();
        }
    }
}
