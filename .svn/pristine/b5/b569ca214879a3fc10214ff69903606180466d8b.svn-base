const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

let pathsToClean = [
    'assets/*.js'
];

let cleanOptions = {
    verbose:  true,
    dry:      false
};

module.exports = merge(baseWebpackConfig,
    {
    output: {
        path: __dirname + "/assets/",//实际产出文件地址
        filename: "[name].[chunkHash:5].js", //产出文件名
       //虚拟地址，url等会加上这个前缀,要使devServer起作用，index.html中的地址要为publicPath/bundle.js
        publicPath:  "./"
    },
    plugins: [
        new webpack.DefinePlugin({
            '_DEV_':true,
            '_PROXY_':false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),

    ],
    });