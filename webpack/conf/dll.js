/**
 * Created By xun  on 2018-10-08 09:10.
 * Description: conf
 */

// 定义 dll 的入口分离包 不能拆分 hxrcs，存在css打包问题
const DLL_ENTRY = {
	react: ['react', 'react-dom', 'react-router-dom', 'prop-types'],
	vendor: ['mobx', 'mobx-react', 'axios'],
	babel: ['babel-polyfill'],
};
// 定义需要dll 分离的包名
const DLL_CHUNKS_NAME = Object.keys(DLL_ENTRY);

module.exports = { DLL_ENTRY, DLL_CHUNKS_NAME };
