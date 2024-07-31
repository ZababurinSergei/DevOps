import path from 'path';
import process from 'process';
import cors from 'cors';
import Enqueue from 'express-enqueue';
import compression from 'compression';
import * as dotenv from 'dotenv';
import express from 'express';
import {env} from './env.mjs'
import open from 'open';
import EventEmitter from "events";
import {socket} from './socket/index.mjs'

const Stream = new EventEmitter();

let hosts = ['cors-pr6x.onrender.com', 'proxy-xpb0.onrender.com'];
let __dirname = process.cwd();
dotenv.config();

let sse = null
export const stream = () => {
    return Stream
}
export const modules = async (app) => {
    let whitelist = ['*']


    const httpServer = await socket(app)

    let corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.includes(origin) !== -1 || whitelist.includes('*')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
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

    app.use(await cors({credentials: true}));
    app.use(queue.getMiddleware());

    app.use((req, res, next) => {
        console.log(`request: ${req.method}: ${req.path}`);
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
        res.set('Cross-Origin-Opener-Policy', 'same-origin');
        next();
    });

    app.use(compression());

    app.use('/', express.static(`${__dirname}/docs`));

    app.get(`/favicon.ico`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'favicon.ico'))
    })

    app.get(`/env.json`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.json'))
    })

    app.get(`/api/*`, async (req, res) => {
        res.send({
            "BTCETH": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCZEC": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBCH": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCCZK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCNOK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBGN": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCAUD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBRL": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCRUB": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCCAD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCUSD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCEUR": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCGBP": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCNEO": {
                "last": 0.00269529815470372,
                "averages": {
                    "day": 0.00814457
                },
                "timestamp": 1535089685,
                "ask": 0.002696300117623886,
                "bid": 0.002693643744789217
            },
            "BCHETH": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHZEC": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHBTC": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHCZK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHNOK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHBGN": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHAUD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHBRL": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHRUB": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHCAD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHUSD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHEUR": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHGBP": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BCHNEO": {
                "last": 0.00269529815470372,
                "averages": {
                    "day": 0.00814457
                },
                "timestamp": 1535089685,
                "ask": 0.002696300117623886,
                "bid": 0.002693643744789217
            },
            "USDBCH": {
                "last": 0.00269529815470372,
                "averages": {
                    "day": 0.00814457
                },
                "timestamp": 1535089685,
                "ask": 0.002696300117623886,
                "bid": 0.002693643744789217
            },
            "EURBCH": {
                "last": 0.00269529815470372,
                "averages": {
                    "day": 0.00814457
                },
                "timestamp": 1535089685,
                "ask": 0.002696300117623886,
                "bid": 0.002693643744789217
            },
        })
    })

    app.get(`/indices/global/ticker/all`, async (req, res) => {
        console.log('@@@@@@@@@@@@@@@@')
        res.send({
            "BTCETH": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCZEC": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBCH": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCCZK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCNOK": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBGN": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCAUD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCBRL": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCRUB": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCCAD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCUSD": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCEUR": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCGBP": {
                "last": 0.021395266752125056,
                "averages": {
                    "day": 0.05197267
                },
                "timestamp": 1535089680,
                "ask": 0.021434040608448474,
                "bid": 0.021342895647318318
            },
            "BTCNEO": {
                "last": 0.00269529815470372,
                "averages": {
                    "day": 0.00814457
                },
                "timestamp": 1535089685,
                "ask": 0.002696300117623886,
                "bid": 0.002693643744789217
            }
        })
    })


    app.get('/*', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.post(`/*`, async (req, res) => {
        console.log('@@@@@@@@@@@@@@@@', req.body)
        res.send({
            test: true,
            status: true
        })
    })

    app.use(queue.getErrorMiddleware());

    return {
        env: await env(),
        app: httpServer,
        open: open
    }
}

export default {
    description: 'server welcomebook'
};