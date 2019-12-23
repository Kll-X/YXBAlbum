const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: {
        bundle: __dirname + "/src/main.js",
        vendor: ["vue", "vue-router"]
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@src': path.join(__dirname, './src'),
            '@components': path.join(__dirname, './src/components'),
            '@images': path.join(__dirname, './src/images'),
            '@store': path.join(__dirname, './src/store'),
            '@lib': path.join(__dirname, './src/lib'),
            '@myWorks': path.join(__dirname, './src/components/myWorks'),
            '@articleEdit': path.join(__dirname, './src/components/myWorks/articleEdit'),
            '@editMode': path.join(__dirname, './src/components/myWorks/editMode'),
            '@pubWorks': path.join(__dirname, './src/components/pubWorks'),
            '@plugin': path.join(__dirname, './src/plugin'),
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),

        new HtmlWebpackPlugin({
            title: '相册制作',
            template: 'template.html', // 模板路径
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                    // options: {
                    //     presets: [
                    //         "es2015",
                    //         "stage-0"
                    //     ]
                    // }
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: "style-loader",
            //       use: "css-loader"
            //     })
            // },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader:  'style-loader!css-loader!less-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024,
                        outputPath: "images/"
                    }
                },
                include: /images/
            }
        ]
    },
};

//    "server": "webpack-dev-server --open  --host 0.0.0.0 --useLocalIp",