/**
 * Created By xun  on 2018-10-08 09:12.
 * Description: utils
 */
const path = require('path');
const constants = require('../conf/dll.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
//创建 dll 的关联包，返回[]
// 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
const createDllReferences = () => {
	const dllChunks = constants.DLL_CHUNKS_NAME;
	const tmpArr = [];
	dllChunks.forEach(item => {
		tmpArr.push(
			new webpack.DllReferencePlugin({
				manifest: require(path.join(__dirname, `../../dll/${item}.manifest.json`)) //)
			})
		);
	});
	return tmpArr;
};
//copy dll 的文件到输出目录

const copyDllToAssets = () => {
	const dllChunks = constants.DLL_CHUNKS_NAME;
	const tmpArr = [];
	dllChunks.forEach(item => {
		tmpArr.push({ from: `dll/${item}.dll.js`, to: 'dll' });
	});
	return new CopyWebpackPlugin(tmpArr);
};

//对dll资源添加相对html的路径
const addDllHtmlPath = () => {
	const dllChunks = constants.DLL_CHUNKS_NAME;
	const tmpArr = [];
	dllChunks.forEach(item => {
		tmpArr.push(`dll/${item}.dll.js`);
	});
	return new HtmlIncludeAssetsPlugin({
		assets: tmpArr, // 添加的资源相对html的路径
		append: false // false 在其他资源的之前添加 true 在其他资源之后添加
	});
};

module.exports = { createDllReferences, copyDllToAssets, addDllHtmlPath };
