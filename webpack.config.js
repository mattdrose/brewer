const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      cache: false,
      inlineSource: '.(js|css)$',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
};
