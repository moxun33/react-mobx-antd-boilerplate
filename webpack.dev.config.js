const merge = require('webpack-merge');
const path = require('path');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');
const devUrl = 'http://localhost:3000'
const devConfig = {
    //devtool: 'inline-source-map',//加了导致热更新很慢.,未知原因
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但[chunkhash]和react-hot-loader不兼容。*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3001,
        compress: true,
        historyApiFallback: true, /*{
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' },
                { from: /^\/subpage/, to: '/views/subpage.html' },
                { from: /./, to: '/views/404.html' }
            ]
        },*/
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: devUrl,//根据实际情况更改
                pathRewrite: {"^/api": ""}
            }
        },


    },
    plugins: [
		new OpenBrowserPlugin({ url: devUrl })
	]
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);