const express = require('express');
const serveStatic = require('serve-static');
const dotEnv = require("dotenv");

dotEnv.config();

const app = express()

app.use(serveStatic(process.env.GAME_DIR, {
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

app.listen(8000, () => {
    console.log('Server has started!')
});
