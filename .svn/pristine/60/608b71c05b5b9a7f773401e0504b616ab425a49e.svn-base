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
            hot: true, //实时刷新,
            proxy: {
                // 将对http://localhost:8090/javaApi/的请求代理为http://yxb.mmarket.com/mssp_photo/
                // 将对http://localhost:8090/phpApi/的请求代理为http://yxbsve.mmarket.com/   需要加上changeOrigin
                '/phpApi':{
                    target: 'http://yxbsve.mmarket.com/',
                    pathRewrite: {
                        "^/phpApi" : "",
                    },
                    secure:false,
                    changeOrigin: true
                },
                '/javaApi': {
                    target: 'http://yxb.mmarket.com/mssp_photo/',
                    pathRewrite: {
                        "^/javaApi" : "",
                    },
                    secure:false,
                    changeOrigin: true
                }

            }
        },
        plugins: [
            new webpack.DefinePlugin({
                '_DEV_':true,
                '_PROXY_':true
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

