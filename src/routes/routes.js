import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildPathRoute } from "../utils/build-route-path.js";
import { Csv } from "../middlewares/csv.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildPathRoute("/task"),
        handler: (req, res) => {
            const users = database.select("task");
            return res.end(JSON.stringify(users));
        },
    },
    {
        method: "POST",
        path: buildPathRoute("/file"),
        handler: (req, res) => {
            const csv = new Csv().import();

            res.writeHead(200).end();
        },
    },
    {
        method: "POST",
        path: buildPathRoute("/task"),
        handler: (req, res) => {
            const id = randomUUID();
            const created_at = new Date();
            const completed_at = null;
            const updated_at = new Date();

            const { title, description } = req.body;

            if (!title || !description) {
                return res.writeHead(404).end(
                    JSON.stringify({
                        message: "Você não informou o título ou a descrição",
                    }),
                );
            }

            database.insert("task", {
                id,
                title,
                description,
                created_at,
                completed_at,
                updated_at,
            });

            return res.writeHead(204).end();
        },
    },
    {
        method: "PUT",
        path: buildPathRoute("/task/:id"),
        handler: (req, res) => {
            const { id } = req.params.groups;
            const { title, description } = req.body;

            database.update("task", id, { title, description });

            res.writeHead(204).end();
        },
    },
    {
        method: "PATCH",
        path: buildPathRoute("/task/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params.groups;

            database.updateComplete("task", id);

            res.writeHead(204).end();
        },
    },
    {
        method: "DELETE",
        path: buildPathRoute("/task/:id"),
        handler: (req, res) => {
            const { id } = req.params.groups;

            database.delete("task", id);
            res.end();
        },
    },
];
