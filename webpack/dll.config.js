/**
 * Created By xun  on 2018-06-22 16:35.
 * Description: webpack.dll.config
 */
const path = require('path');
const webpack = require('webpack');
const dllConstants = require('./conf/dll.js');
module.exports = {
	entry: dllConstants.DLL_ENTRY,
	output: {
		filename: '[name].dll.js', // 动态链接库输出的文件名称
		path: path.join(__dirname, '../dll'), // 动态链接库输出路径
		libraryTarget: 'var', // 链接库(react.dll.js)输出方式 默认'var'形式赋给变量 b
		library: '_dll_[name]_[hash]' // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
	},
	plugins: [
		new webpack.DllPlugin({
			// path 指定manifest文件的输出路径
			path: path.join(__dirname, '../dll', '[name].manifest.json'),
			context: __dirname,
			name: '_dll_[name]_[hash]' // 和library 一致，输出的manifest.json中的name值
		})
	]
};
