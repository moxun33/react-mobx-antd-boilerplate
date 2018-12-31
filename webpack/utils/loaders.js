/**
 * Created By xun  on 2018-12-13 15:13.
 * Description: loaders 各种加载器规则、插件，非特殊说明，都是通用配置
 */
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
//转换 less 变量,用于主题
const themer = lessToJs(
	fs.readFileSync(path.join(__dirname, '../../src/themes/base.less'), 'utf8')
);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DEV_ENV = process.env.NODE_ENV === 'development';
//babel-loader
const JSLoaders = [
	{
		loader: 'babel-loader',
		options: {
			cacheDirectory: true
		}
	}
];

//less文件的loader
const LessLoaders = [
	'style-loader',
	{ loader: 'css-loader', options: { importLoaders: 1 } },
	'postcss-loader',
	{
		loader: 'less-loader',
		options: {
			sourceMap: !DEV_ENV,
			modifyVars: themer,
			javascriptEnabled: true,
			paths: [path.resolve(__dirname, '../node_modules')]
		}
	}
];

//image loader
const ImageLoaders = [
	{
		loader: 'url-loader',
		options: {
			limit: 8192,
			name: 'assets/img/[hash:8].[name].[ext]'
		}
	}
];

// 字体的 loader
const FontLoaders = [
	{
		loader: 'url-loader',
		options: {
			limit: 8192,
			name: 'assets/fonts/[hash:8].[name].[ext]'
		}
	}
];

/*、*
 * 生产环境的 css 加载
 * */
const ProdCSSLoaders = [
	MiniCssExtractPlugin.loader,
	{
		loader: 'css-loader',
		options: {
			importLoaders: 1,
			localIdentName: '[name]_[local]_[hash:8]',
			sourceMap: true,
			minimize: true
		}
	},
	'postcss-loader'
];

module.exports = { FontLoaders, ImageLoaders, JSLoaders, LessLoaders, ProdCSSLoaders };
