const path = require('path');
const baseConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: path.join(process.cwd(),'dist'),
    filename: 'main.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.join(process.cwd(), 'src', 'serve'),
          from: 'package.json'
        }
      ]
    })
  ],
  externals: [nodeExternals()]
}