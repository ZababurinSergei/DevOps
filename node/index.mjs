import express from "express";
import http from "http";
import path from "path";
import {ExpressPeerServer} from "peer";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: "/myapp",
    ssl: {},
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

server.listen(port);
console.log(`Listening on: ${port}`);