const express = require('express');
const serveStatic = require('serve-static');
const dotEnv = require("dotenv");
const {readdirSync, statSync, existsSync} = require("node:fs");
const {join} = require("node:path");

dotEnv.config();
let port = process.env.PORT ?? 3000

const gameDirPath = process.env.GAME_DIR;
const gameDirs = process.env.DEPLOY_MULTIPLE_GAMES === "true" ? readdirSync(gameDirPath).filter(file => statSync(join(gameDirPath, file)).isDirectory()).filter(file => file !== '__MACOSX') : [gameDirPath];

gameDirs.forEach(gameDir => {
    const app = express();
    let servePath =process.env.DEPLOY_MULTIPLE_GAMES === "true" ? join(process.env.GAME_DIR, gameDir) : gameDir;
    if (existsSync(join(servePath, "web-build"))) {
        servePath = join(servePath, "web-build")
    }
    app.use(serveStatic(servePath, {
        setHeaders: (res, path) => {
            if (path.endsWith('.br')) {
                res.setHeader('Content-Encoding', 'br');
            }
            if (path.endsWith('.gz')) {
                res.setHeader('Content-Encoding', 'gzip');
            }
            if (path.indexOf('.wasm') !== -1) {
                res.setHeader('Content-Type', 'application/wasm');
            }
        }
    }));

    app.listen(port, () => {
        console.log('Server has started!')
    });

    port++;
});





