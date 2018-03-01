var config = require('./webpack.config.js')

config.entry = {
  'antd-db': './src/index.js'
}

config.output = {
  filename: './dist/[name].js',
  library: 'AntdDb',
  libraryTarget: 'umd'
}

module.exports = config