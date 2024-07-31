import express from "express";
import {Server} from 'socket.io'
import http from "http";

const __dirname = process.cwd();
const app = express();
const httpServer = http.createServer(app);
app.use((req, res, next) => {
    console.log(`request: ${req.method}: ${req.path}`);
    next();
});

const io = new Server(httpServer, {path: '/socket.io/'});

app.use((req, res, next) => {
    console.log(`request: ${req.method}: ${req.path}`);
    next();
});

// app.get('/*', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('---- 1 connection 1 ----')
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(8426, () => {
    console.log('listening on *:8426');
});