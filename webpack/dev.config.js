const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./common.config.js');

const devConfig = {
	devtool: 'eval',
	entry: {
		app: [path.join(__dirname, '../src/index.js')]
	},

	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	},
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 5000,
    compress: true,
    historyApiFallback: true, /*{
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' },
                { from: /^\/subpage/, to: '/views/subpage.html' },
                { from: /./, to: '/views/404.html' }
            ]
        },*/
    host: 'localhost',
    open:true,
    proxy: {

      '/api': {
        'target':'http://localhost:8080',
        'pathRewrite': {
          '^/api': ''
        },
        secure: false,
        changeOrigin: true,
        proxyTimeout: 1000 * 60 * 5 // 5 minutes
      },

    }
  },
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
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
