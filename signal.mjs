import express from "express";
import http from "http";
import path from "path";
import {ExpressPeerServer} from "peer";
import process from "process";
let __dirname = process.cwd();

const app = express();
const signal = http.createServer(app);

const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(signal, {
    proxied: true,
    debug: true,
    path: "/myapp",
    ssl: {},
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/ping", (request, response) => {
    response.status(200).send({
        status: true
    });
});

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

signal.listen(port);
console.log(`Listening on: ${port}`);