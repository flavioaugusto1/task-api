import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildPathRoute } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildPathRoute("/task"),
        handler: (req, res) => {
            const users = database.select("users");
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

            database.insert("users", {
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
            res.end("Entrou no put");
        },
    },
    {
        method: "DELETE",
        path: buildPathRoute("/task/:id"),
        handler: (req, res) => {},
    },
];
