/**
 * Created By xun  on 2018-12-13 14:52.
 * Description: HappyPackLoaders 创建 HappyPack 加载器
 */
const HappyPack = require('happypack'),
	os = require('os'),
	happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const path = require('path');
const HX_CONF = require('../conf/index.js');
const happyIds = HX_CONF.HX_HAPPY_PACK_ID_MAP;
const loaderCreator = require('./loaders.js');

const addHappyId = id => `happypack/loader?id=${id}`;

/*、*
 * webpack 的关于 happyPack 的 rules
 * */
const HPWPRules = [
	{
		test: /\.js$/,
		use: addHappyId(happyIds.jsHappy),
		include: path.join(__dirname, '../../src'), //注意路径
		exclude: /node_modules/
	},

	{
		test: /\.(jpe?g|png|pdf|svg|gif|ico)$/,

		loaders: loaderCreator.ImageLoaders
	},

	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loaders: loaderCreator.FontLoaders
	},
	{
		test: /\.less$/,
		use: addHappyId(happyIds.lessHappy)
	}
];

 

const initHPInstance = (id, loaders = []) =>
	new HappyPack({
		id: id,
		threadPool: happyThreadPool,
		loaders: loaders
	});

 
/**
 * 公用 happyPack 的插件
 * */

const HPWPPlugins = [
	initHPInstance(happyIds.jsHappy, loaderCreator.JSLoaders),
	initHPInstance(happyIds.lessHappy, loaderCreator.LessLoaders)
];

module.exports = { HPWPRules, HPWPPlugins,  };
