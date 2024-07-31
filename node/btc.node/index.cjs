require('dotenv').config()
const chokidar = require('chokidar');
const fs = require('fs')
const server = import('./index.mjs');
const express = require('express');
let app = express();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

server.then(async (data) => {
    data.modules(app).then(({app, open, Stream, env})=> {
        const port = env.PORT
            ? env.PORT
            : 8332;

        const watcher = chokidar.watch('./src', {
            ignored: ['**/node_modules', /^\./, './src/addons'],
            persistent: true
        });

        const watcherComponents = chokidar.watch('./src/addons', {
            ignored: ['**/node_modules', /^\./, './src/index.html'],
            persistent: true
        });

        watcherComponents
            .on('add', async function(path) {
                // console.log('File', path, 'has been added');
            })
            .on('change', async function(path) {
                console.log('reload html')
            })
            .on('unlink', function(path) {console.log('File', path, 'has  2 been removed');})
            .on('error', function(error) {console.error('Error  2 happened', error);})

        watcher
            .on('add', async function(path) {
                // console.log('File', path, 'has been added');
            })
            .on('change', async function(path) {
                // const build = await esbuild
                // const data = await build.build()

                console.log('Reload html')
            })
            .on('unlink', function(path) {console.log('File', path, 'has been removed');})
            .on('error', function(error) {console.error('Error happened', error);})


        app.listen(port, '127.0.0.1');
        app.on('listening', function() {
            console.log('pid: ', process.pid);
            console.log(`listening on ${app.address().address}:` + port);
        });

        process.on('SIGINT', function () {
            Stream.emit("push", "message", {
                type: 'dev',
                msg: 'close'
            });
            process.exit(0);
        });
    }).catch(e => console.error(e));
});
