import express from "express";
import http from "http";
import path from "path";
import {ExpressPeerServer} from "peer";
import process from "process";
import helmet from "helmet";
import cors from "cors";

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

app.use(cors())

app.use(peerServer);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.html`);
});

signal.listen(port);

console.log('pid: ', process.pid);
console.log('listening on http://localhost:' + port);