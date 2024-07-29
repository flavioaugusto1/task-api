import fs from "node:fs";
import { parse } from "csv";

const pathFile = new URL("../task.csv", import.meta.url);

export class Csv {
    async import() {
        const parser = fs
            .createReadStream(pathFile, "utf-8")
            .pipe(parse({ delimiter: ",", columns: true }));

        for await (const row of parser) {
            await fetch("http://localhost:3333/task", {
                method: "POST",
                body: JSON.stringify(row),
            });
        }
    }
}
