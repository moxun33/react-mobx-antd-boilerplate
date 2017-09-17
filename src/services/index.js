const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


commonConfig = {
    /*入口*/
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'mobx', 'react-dom', 'mobx-react']//剥离第三方库,可自定义增加
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',//如果开发环境用chunkhash，会报错。和webpack-dev-server --hot不兼容
        chunkFilename: '[name].[chunkhash].js'
    },

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            stores: path.join(__dirname, 'src/stores')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })

    ],
};

module.exports = commonConfig;