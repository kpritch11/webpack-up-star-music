const express = require('express');
const path = require('path');

const app = express();

// Server routes above express configuration
app.get('/hello', (request, response) => response.send({ hi: 'there' }));

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('dist'));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'dist/index.html'));
    });
} else {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
}

const port = process.env.PORT || 3050;
app.listen(port, () => console.log('Listening on port', port));
