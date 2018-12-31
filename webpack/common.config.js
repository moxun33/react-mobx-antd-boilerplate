const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEV_ENV = process.env.NODE_ENV === 'development';
const wpUtils = require('./utils/index.js');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HXHappyPackUtils = require('./utils/HappyPacks.js')
const happyRules = HXHappyPackUtils.HPWPRules;
const happyPlugins = HXHappyPackUtils.HPWPPlugins
 
//公共配置
const commonConfig = {
	entry: {
		app: [path.join(__dirname, '../src/index.js')],
		hxrcs: ['hxrcs'] //分离第三方库,可自定义增加,其他包在 dll 中分离
	},
	output: {
		path: path.join(__dirname, '../dist'),
		/*这里本来应该是[chunkhash]的，但[chunkhash]和react-hot-loader不兼容。*/
		filename: `${DEV_ENV ? '[hash]' : '[name].[chunkhash:8]'}.js`,
		chunkFilename: 'js/[name].[chunkhash:8].js',
		publicPath: '/',
		globalObject: 'this'
	},

	module: {
		rules: [
			...happyRules
		],
		noParse: [/lodash\.js$/, /react\.min\.js$/]
	},
	optimization: {},
	plugins: [
		...happyPlugins,
		new WebpackBar({ profile: true, minimal: false }),
		new HtmlWebpackPlugin({
			title: '和信保理ABS业务平台',
			filename: 'index.html',
			favicon: path.join(__dirname, '../src/assets/favicon.ico'),
			template: path.join(__dirname, '../src/index.html'),
			chunksSortMode: 'none', //否则出现错误
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),
		/*若使用了 PDFView  必须做 copy 操作*/
		new CopyWebpackPlugin([
			{
				from: 'node_modules/hxrcs/lib/dist/cmaps/',
				to: 'cmaps/'
			}
		])
	],

	resolve: {
		alias: wpUtils.createAlias(), //引用时需要精确引用，默认 index 暂时失效。如：import utils from 'utils/index'
		modules: [path.join(__dirname, '../src'), 'node_modules'],
		extensions: ['.js', '.jsx']
	},
 
};

module.exports = commonConfig;
