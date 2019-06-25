const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./common.config.js');
const portfinder = require('portfinder'); // 自动检索下一个可用端口
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 友好提示错误信息
const UAT_URL = '', DEV_PORT=3005
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
    port: DEV_PORT,
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
        'target': UAT_URL + '/target',
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
const devWebpackConfig = merge({
	customizeArray(a, b, key) {
		/*entry.app不合并，全替换*/
		if (key === 'entry.app') {
			return b;
		}
		return undefined;
	}
})(commonConfig, devConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT||DEV_PORT; // 获取当前设定的端口
  portfinder.getPort((err, port) => {
    if (err) { reject(err) } else {
      process.env.PORT = port; // process 公布端口
      devWebpackConfig.devServer.port = port; // 设置 devServer 端口

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({ // 错误提示插件
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://localhost:${port}`],
        },
        onErrors:  undefined
      }))

      resolve(devWebpackConfig);
    }
  })
})
