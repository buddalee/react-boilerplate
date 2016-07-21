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
    new webpack.NoErrorsPlugin()
 ],
 // eslint: {
 //  failError: true
 // },
 module: {
  // preLoaders: [{
  //   test: /\.js?$/,
  //   exclude: /node_modules/,
  //   loaders: ['eslint']
  // }],
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
      test: /\.(jpg|png|svg|jpeg|gif)/,
      loaders: ['url-loader?limit=10000'],
    }, {
      test: /\.json$/,
      loader: 'json'
    }
  ]},
  resolve: {
    extensions: ['', '.js', '.json'] 
  } 
} 
