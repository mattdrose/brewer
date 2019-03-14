require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const resources = require('./scripts/resources');

module.exports = resources.images().then((images) => {
  return {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    mode: process.env.NODE_ENV || 'production',
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        { 
          test: /\.hbs$/, 
          loader: 'handlebars-loader',
          query: { 
            helperDirs: [
              __dirname + '/helpers',
            ]
          },
        },
        { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      ],
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: 'Homepage',
        filename: 'index.html',
        template: 'index.hbs',
        templateParameters: {images},
        cache: false,
        inlineSource: '.(js|css)$',
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin(),
      new HtmlWebpackInlineSourcePlugin(),
      new OptimizeCssAssetsPlugin(),
      new CopyPlugin([
        { from: 'fonts', to: 'fonts' },
      ]),
    ],
  };
})
