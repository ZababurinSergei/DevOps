import path from 'path';
import process from 'process';
import cors from 'cors';
import Enqueue from 'express-enqueue';
import compression from 'compression';
import * as dotenv from 'dotenv';
import express from 'express';
import { env } from './env.mjs'
import open from 'open';
import EventEmitter from "events";
import { socket } from './socket/index.mjs'
const Stream = new EventEmitter();

let hosts = ['cors-pr6x.onrender.com', 'proxy-xpb0.onrender.com'];
let __dirname = process.cwd();
dotenv.config();

let sse = null
export const stream = () => {
    return Stream
}
export const modules = async (app) => {
    let whitelist = []

    let corsOptions = {
        origin: function (origin, callback) {
            callback(null, true);
            // if (whitelist.indexOf(origin) !== -1) {
            //     callback(null, true);
            // } else {
            //     callback(new Error('Not allowed by CORS'));
            // }
        }
    };

    app.use((req, res, next) => {
        console.log(`request: ${req.method}: ${req.path}`);
        next();
    });

    app.use(express.json());

    const queue = new Enqueue({
        concurrentWorkers: 4,
        maxSize: 200,
        timeout: 30000
    });

    console.log('__dirname', __dirname);

    app.use(await cors({ credentials: true }));
    app.use(queue.getMiddleware());

    app.use((req, res, next) => {
        console.log(`request: ${req.method}: ${req.path}`);
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
        res.set('Cross-Origin-Opener-Policy', 'same-origin');
        next();
    });

    app.use(compression());

    app.use(express.static(`${__dirname}/DevOps`));

    app.use('/',express.static(`${__dirname}/docs`));

    app.get(`/favicon.ico`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'favicon.ico'))
    })

    app.get(`/env.json`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.json'))
    })

    app.get(`/env.mjs`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.mjs'))
    })

    app.use(queue.getErrorMiddleware());

    const httpServer = await socket(app)
    return {
        env: await env(),
        app: httpServer,
        open: open
    }
}

export default {
    description: 'server welcomebook'
};