const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
//转换 less 变量,用于主题
const themer = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/base.less'), 'utf8'));
const commonConfig = {
	entry: {
		app: [
			path.join(__dirname, 'src/index.js')
		],
	 	vendor: ['react', 'react-router-dom','mobx' ,'react-dom', 'mobx-react', 'antd',
			 'lodash', 'prop-types', 'axios'] //分离第三方库,可自定义增加
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: 'js/[name].[chunkhash].js',
		publicPath: "/"
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				}
			}],
			include: path.join(__dirname, 'src'),
			exclude: /node_modules/
		}, {
			test: /\.(jpe?g|png|gif|mp4|ttf|webm|woff|eot|otf|webp|svg|ico)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'assets/[hash:8].[name].[ext]'
				}
			}]
		}, {
			test: /\.(xml|bpmn)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1
				}
			}]
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				{ loader: 'css-loader', options: { importLoaders: 1 } },
				'postcss-loader',
				{loader:'less-loader', options: {
						modifyVars: themer
					}}
			]
		}],
		noParse: [/react\.min\.js$/],
	},
	optimization: {
		splitChunks: {
			chunks: 'initial', // 只对入口文件处理
			cacheGroups: {
				vendor: { // split `node_modules`目录下被打包的代码到 `js/chunks/vendor.js
					test: /node_modules\//,
					name: 'chunks/vendor',
					priority: 10,
					enforce: true,
					reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
				},
				commons: { // split `common`和`components`目录下被打包的代码到`js/chunks/commons.js `
					test: /common\/|components\//,
					name: 'chunks/commons',
					priority: 10,
					enforce: true,
					reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
				}
			}
		},
		runtimeChunk: {
			name: 'manifests/manifest'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			//favicon: 'src/assets/favicon.ico',
			template: path.join(__dirname, 'src/index.html')
		}),
		new webpack.HashedModuleIdsPlugin(),
	],
	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			components: path.join(__dirname, 'src/components'),
			router: path.join(__dirname, 'src/router'),
			stores: path.join(__dirname, 'src/stores'),
			constants: path.join(__dirname, 'src/constants'),
			services: path.join(__dirname, 'src/services'),
			utils: path.join(__dirname, 'src/utils'),
			assets: path.join(__dirname, 'src/assets'),
			themes: path.join(__dirname, 'src/themes'),
			static: path.join(__dirname, 'src/static'),
        },
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: [".js", ".jsx"]
	}
};
module.exports = commonConfig;