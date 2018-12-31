/**
 * Created By xun  on 2018-10-08 14:28.
 * Description: index
 */
const path = require('path');
const wpConstants = require('../conf/index.js');
//创建别名,
const createAlias = () => {
	const alias = wpConstants.ALIAS_CONFIG;
	const obj = {
		root: path.join(__dirname, '../../src'),
		react: path.join(__dirname, '../../node_modules/react')
	};
	alias.forEach(item => {
		obj[item] = path.join(__dirname, `../../src/${item}`);
	});
	return obj;
};

module.exports = { createAlias };
