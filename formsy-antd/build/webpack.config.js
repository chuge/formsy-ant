var webpack = require('webpack')
var path = require('path')

var os = require('os')
var HappyPack = require('happypack')
var cpus = os.cpus().length
var happyThreadPool = HappyPack.ThreadPool({
  size: cpus
})

module.exports = {
  entry: {
    'build-docs': './src/components/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'css'
            }
          }
        ]
      }, {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'js'
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'less'
            }
          }
        ]
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.(svg|png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [
        'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&compact[]=false'
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({id: 'less', loaders: ['style-loader/useable!css-loader!less-loader'], threadPool: happyThreadPool}),
    new HappyPack({id: 'css', loaders: ['style-loader/useable!css-loader'], threadPool: happyThreadPool})
  ],
  devtool: '#eval-source-map'
}
