import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildPathRoute } from "../utils/build-route-path.js";

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
        path: buildPathRoute("/task"),
        handler: (req, res) => {
            const id = randomUUID();
            const createdAt = new Date();
            const completedAt = null;
            const updatedAt = new Date();

            const { title, description } = req.body;

            database.insert("task", {
                id,
                title,
                description,
                createdAt,
                completedAt,
                updatedAt,
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
        method: "DELETE",
        path: buildPathRoute("/task/:id"),
        handler: (req, res) => {
            const { id } = req.params.groups;

            database.delete("task", id);
            res.end();
        },
    },
];
