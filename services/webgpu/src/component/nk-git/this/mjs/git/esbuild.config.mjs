import * as esbuild from 'esbuild'
import fs from 'fs'
import { copy } from 'esbuild-plugin-copy';
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import aliasPlugin from 'esbuild-plugin-path-alias';
import { glsl } from "esbuild-plugin-glsl";
import path from 'path';
import * as dotenv from 'dotenv'
dotenv.config()

const __dirname = path.join(path.dirname(process.argv[1]), './');

const isWatch = process.argv.includes("--watch");

let define = {}

for (const k in process.env) {
    if (k.startsWith('REACT_APP_') || k.startsWith('PUBLIC_URL') || k.startsWith('PORT')) {
        define[`process.env.${k}`] = JSON.stringify(process.env[k]);
    }
}

if (!fs.existsSync(path.resolve(__dirname, 'this'))) {
    fs.mkdirSync(path.resolve(__dirname, 'this'));
}

let entryPoints = [path.resolve(__dirname, './index.js')]
let outdir = path.resolve(__dirname, 'this')
let outfile = path.resolve(__dirname, 'this/index.mjs')

console.time("⚡ [esbuild] Done");
console.time("⚡ [esbuild]apis Done");
try {
    const buildParams = {
        entryPoints: entryPoints,
        bundle: true,
        metafile: true,
        outfile: outfile,
        format: "esm",
        define,
        loader: { ".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file", ".woff": "file" },
        color: true,
        minify: true,
        sourcemap: true,
        mainFields : [ 'module' , 'main' ],
        plugins: [
            polyfillNode({
                process: true,
                buffer: true,
                define
            })
        ]
    }

    esbuild.build(buildParams)
        .then(result => {
            console.log('BUILD: SUCCESS', result)
            console.timeEnd("⚡ [esbuild] Done")
    }).catch(e => console.error(e))

    let entryPointsApi = [path.resolve(__dirname, './internal-apis.js')]
    let outfileApi = path.resolve(__dirname, './this/index-internal-apis.mjs')

    let buildApis = {
        entryPoints: entryPointsApi,
        bundle: true,
        metafile: true,
        outfile: outfileApi,
        format: "esm",
        define,
        loader: { ".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file", ".woff": "file" },
        color: true,
        minify: true,
        sourcemap: true,
        mainFields : [ 'module' , 'main' ],
        plugins: [
            polyfillNode({
                process: true,
                buffer: true,
                define
            }),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: {
                    from: ['./http/**/*'],
                    to: ['./this/http']
                },
                watch: false,
            })
        ]
    }

    esbuild.build(buildApis)
        .then(result => {
            console.log('BUILD API: SUCCESS', result)
            console.timeEnd("⚡ [esbuild]apis Done")
        }).catch(e => console.error(e))

    // buildParams.entryPoints = entryPoints
    // buildParams.outfile = outfile


} catch (e) {
    console.timeEnd("⚡ [esbuild] Done")
    console.log('nk-error',e)
    process.exit(1)
}