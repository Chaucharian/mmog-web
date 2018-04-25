const path = require('path');
/* HOT RELOADING IS WAITING FOR IMPLEMENTATION
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');*/
const webpack = require('webpack');

module.exports = {
    entry: './src/game/main.js',
    output: {
        path: path.resolve(__dirname, './src/public/js'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
     {
       test: /\.js$/,
       use: {
         loader: "babel-loader",
         options: { presets: ["es2015"] }
       }
     }]
    },
  /*  devServer: {
      contentBase: './src/game/main.js',
      hot: true
    },
    plugins: [  new CleanWebpackPlugin([dist]),
        new HtmlWebpackPlugin({
            title: 'Hot Module Reload'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()],*/
    plugins: [new webpack.ProvidePlugin({
      Matter: 'matter-js'
    })],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
