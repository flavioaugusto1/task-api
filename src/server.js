import http from "node:http";
import { json } from "stream/consumers";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);
});

server.listen(3333);
