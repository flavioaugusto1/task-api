export const routes = [
    {
        method: "GET",
        path: "/users",
        handler: (req, res) => {
            res.end("Entrou no get");
        },
    },
    {
        method: "POST",
        path: "/users",
        handler: (req, res) => {
            res.end("Entrou no POST");
        },
    },
    {
        method: "PUT",
        path: "/users/:id",
        handler: (req, res) => {
            res.end("Entrou no put");
        },
    },
    {
        method: "DELETE",
        path: "/users/:id",
        handler: (req, res) => {
            res.end("Entrou no delete");
        },
    },
];
