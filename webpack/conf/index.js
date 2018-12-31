/**
 * Created By xun  on 2018-10-08 14:28.
 * Description: index
 */
//别名的配置
const ALIAS_CONFIG = [
	'pages',
	'constants',
	'components',
	'stores',
	'services',
	'utils',
	'assets',
	'static',
	'db'
];

/**
 * 定义使用 HappyPack 的 ID
 * */
const HX_HAPPY_PACK_ID_MAP = {
	lessHappy: 'lessHappy',
	jsHappy: 'jsHappy',
	cssHappy: 'cssHappy',
};
module.exports = { ALIAS_CONFIG, HX_HAPPY_PACK_ID_MAP };
