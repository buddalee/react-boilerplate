var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin()
 ],
 module: {
   loaders: [
     {
       test: /\.js$/,
       loaders: ['react-hot', 'babel'],
       include: path.resolve(__dirname, 'src'),
       exclude: '/node_modules/'
     }, {
      test: /\.css$/,
      loader: ['style-loader!css-loader']
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.json'] 
 } 
} 
