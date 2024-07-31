import { createServer } from "node:http";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
export const socket = async (app) => {
    const httpServer = createServer(app)

    const io = new Server(httpServer, {path: '/socket.io/'});


    io.on('connection', (socket) => {
        console.log('---- 1 connection 1 ----')
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return httpServer
}