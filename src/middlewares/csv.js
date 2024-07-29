import fs from "node:fs";
import { parse } from "csv";

export class Csv {
    async import() {
        const parser = fs
            .createReadStream("task.csv", "utf-8")
            .pipe(parse({ delimiter: ",", columns: true }));

        for await (const row of parser) {
            fetch("http://localhost:3333/task", {
                method: "POST",
                body: JSON.stringify(row),
            });
        }
    }
}
