const merge = require('webpack-merge');
const webpack = require('webpack');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./common.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dllUtils = require('./utils/dll.js');
const WPLoaders = require('./utils/loaders.js');
const splitCacheGroupsProps = {
	priority: 10,
	minChunks: 2,
	maxInitialRequests: 5,
	minSize: 0,
	reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
};

//生产环境的配置
const buildConfig = {
//	devtool: 'cheap-module-source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				loaders: WPLoaders.ProdCSSLoaders
			}
		]
	},
	optimization: {
		runtimeChunk: {
			name: 'manifest/manifest'
		},
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			cacheGroups: {
				app: {
					//key为 entry 的 key
					test: /src\//,
					name: 'chunks/app',
					...splitCacheGroupsProps
				},
				hxrcs: {
					test: /node_modules\//,
					name: 'chunks/vendors',
					...splitCacheGroupsProps
				},
				commons: {
					test: /common\/|components\//,
					name: 'chunks/commons',
					...splitCacheGroupsProps
				}
			}
		},
		minimizer: [
			new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin
		]
	},
	plugins: [
		new TerserPlugin({
			parallel: true,
			sourceMap: false,
			terserOptions: {
				//ecma: 7,
				warnings: false,
				compress: {
					drop_console: true,
					collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
					reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
				},
				output: {
					comments: false,
					beautify: false
				},
				ie8: false,
				safari10: true
			}
		}),
		// Ignore all locale files of moment.js
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production:dev')
			}
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].css',
			chunkFilename: 'css/[id].[hash:8].css'
		}),
		dllUtils.copyDllToAssets(),
		...dllUtils.createDllReferences(),
		dllUtils.addDllHtmlPath()
	]
};

if (process.env.NODE_ENV === 'production:analyze') {
	buildConfig.plugins.push(new BundleAnalyzerPlugin()); //仅在分析时启用
}
module.exports = merge(commonConfig, buildConfig);
