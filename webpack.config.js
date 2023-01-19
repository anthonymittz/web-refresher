const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  assetFolder: path.join(__dirname, 'assets'),
  outputDir: path.join(__dirname, 'build'),
  entryFile: path.join(__dirname, 'src', 'index.js'),
  htmlTemplate: path.join(__dirname, 'src', 'template.html'),
};

/** @type {import('webpack').Configuration} */
const webpackConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: paths.assetFolder,
    watchFiles: ['./src/**/*.js', './assets/*']
  },
  entry: paths.entryFile,
  output: {
    path: paths.outputDir,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    // publicPath: '/web-refresher/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: ['@babel/preset-env', '@babel/preset-react']}
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: paths.htmlTemplate}),
    new MiniCssExtractPlugin()
  ]
};

module.exports = webpackConfig;