  var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
 ],
 module: {
  /* preLoaders: [
    {
       test: /\.js?$/,
       exclude: /node_modules/,
       loader: 'eslint-loader'
    }
  ], */
  loaders: [
     {
       test: /\.js$/,
       loaders: ['react-hot', 'babel'],
       include: path.join(__dirname, 'src'),
       exclude: '/node_modules/'
     }, {
      test: /\.css$/,
      loader: 'style!css'
     }, {
      test: /\.(jpg|png|svg|jpeg|gif|woff|woff2|eot|ttf)/,
      loaders: ['url-loader?limit=10000'],
    }, {
      test: /\.json$/,
      loader: 'json'
    }
  ]},
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
} 
