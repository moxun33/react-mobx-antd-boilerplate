const merge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common.config.js');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicConfig = {
	devtool: 'cheap-module-source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
					"css-loader",
					'postcss-loader',
				]
			}
		]
	},
	optimization: {
		minimizer: [
			// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
			new ParallelUglifyPlugin({
				// 传递给 UglifyJS 的参数
				uglifyJS: {
					compress: {
						warnings: false,
						drop_debugger: true,
						drop_console: true
					},
					output: {
						comments: false
					},
				},
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist/*.*']),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production:dev')
			},
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/app.[name].css',
			chunkFilename: 'css/app.[id].css'
		})
	]
};
module.exports = merge(commonConfig, publicConfig);