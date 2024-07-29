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

    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter((row) => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key]
                        .toLowerCase()
                        .includes(decodeURIComponent(value).toLowerCase());
                });
            });
        }

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

    updateComplete(table, id) {
        const itemRow = this.#database[table].findIndex((row) => {
            return row.id === id;
        });

        if (itemRow > -1) {
            this.#database[table][itemRow].completed_at = new Date();
            this.#database[table][itemRow].updated_at = new Date();
            this.#persist();
        }
    }

    update(table, id, data) {
        const itemRow = this.#database[table].findIndex((row) => {
            return row.id === id;
        });

        if (itemRow > -1) {
            const { created_at, completed_at } = this.#database[table][itemRow];

            if (!data.title) {
                data.title = this.#database[table][itemRow].title;
            }

            if (!data.description) {
                data.description = this.#database[table][itemRow].description;
            }

            const updatedAt = new Date();

            this.#database[table][itemRow] = {
                id,
                ...data,
                created_at,
                completed_at,
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
