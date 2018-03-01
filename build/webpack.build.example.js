const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: [
    path.join(__dirname, '../examples/client.js')
  ],
  devServer:{
    contentBase: 'examples',
    devtool: 'cheap-module-eval-source-map',
    hot: true,
    inline: true,
    port: 3003,
    host: 'localhost',
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'examples/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader/useable', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: "style-loader/useable!css-loader!less-loader"
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ],
  }
};

module.exports = config;
