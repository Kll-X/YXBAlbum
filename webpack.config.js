const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig,
    {
        devtool: "eval-source-map",

        output: {
            path: __dirname + "/assets/",//实际产出文件地址
            filename: "[name].[hash:5].js", //产出文件名
            //虚拟地址，url等会加上这个前缀,要使devServer起作用，index.html中的地址要为publicPath/bundle.js
            //  publicPath:  "./"
        },

        devServer: {
            contentBase: "./assets",//本地服务器加载页面目录
            historyApiFallback: true, //不跳转
            inline: true,
            hot: true //实时刷新
        },
        plugins: [
            new webpack.DefinePlugin({
                '_DEV_':true,
                '_PROXY_':false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_debugger:true,
                    drop_console:true
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

    }
);

