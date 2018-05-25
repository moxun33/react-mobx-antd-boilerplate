import axios from 'axios';
import Raven from 'raven-js';
import appStore from 'stores/appStore';
 
 
axios.defaults.timeout = 180000;
//axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
/**
 * token过期或者未登录
 * */
const redirectToLogin = () => {
	window.localStorage.clear();
	window.location.href = '/user/login';
};
/**
 * 如果登录了，就把token写入header
 * */
//请求拦截
axios.interceptors.request.use(
	config => {
		if (config.method === 'post' && config.data) {
			//非 json 串时
			if (config.headers['Content-Type'] !== 'application/json') {
				//统一用 formData 提交
				config.headers['Content-Type'] = 'multipart/form-data';
				let formData = new FormData();
				const object = config.data;
		 
				Object.keys(object).forEach(key => {
					if (object[key]) {
						if (object[key].constructor !== Array) {
							 
								formData.append(key, object[key]);
							
						} else {
							//数组的数据
							//  console.log(' 是数组，多个文件')
							const fileList = object[key];
							for (let i = 0; i < fileList.length; i++) {
								const item = fileList[i];
								// console.log('每个文件内容',item,i, '数组长度',fileList.length)
								formData.append(key, item);
							}
						}
					} else {
						//  formData.append(key, '');
					}
				});
				config.data = formData;
			}
		}
		if (config.method === 'get') {
			if (config.url.indexOf('unauthorizedError') > -1) {
				config.url.replace('unauthorizedError', 'api/unauthorizedError');
			}
			//大文件
			if (config.responseType === 'blob') {
				config.headers['Accept'] =
					'*/*';
				config.headers['Content-Type'] =
					'application/x-www-form-urlencoded;charset=UTF-8';
			} else {
				//获取列表时
				if (config.url.endsWith('List')) {
					//默认不分页
					if (!config.params.page) {
						config.params['page'] = -1;
					}
					if (!config.params.pageLength) {
						config.params['pageLength'] = 50;
					}
				}
			}
		}
	 
		const isLoginded = window.localStorage.getItem('isLogined');
		const authToken = window.localStorage.getItem('token');
		if (isLoginded && authToken) {
			config.headers.common['Authorization'] = authToken;
		}
		config.withCredentials = true;
		console.log(config, config.data);
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
//响应拦截
axios.interceptors.response.use(
	response => {
		 
			return response.data;
		 
		}
		appStore.hideLoading();
	},
	error => {

		appStore.hideLoading();
		const errRes = error.response && error.response.data ? error.response.data : error;
		console.error('请求出错啦', errRes);
	 
	}
);
export default axios;