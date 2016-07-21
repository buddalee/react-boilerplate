const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const config = require('./webpack.config.js');

const port = '3000';
const app = express();
app.use(historyApiFallback({
  index: '/static/index.html',
  verbose: true,
  logger: console.log.bind(console)
}));

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  // quiet: true,
  noInfo: false,
  // lazy: false,
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.listen(port,'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening port %s', port);
});
