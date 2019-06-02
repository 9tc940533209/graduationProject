// 引入axios
import axios from 'axios';
import Qs from 'qs';
import router from "../../router/router";
import qs from "qs";
import Vue from 'vue';
let v = new Vue();
// 创建新的axios实例
var $http
// 配置请求地址
$http = axios.create({
	baseURL:'/she/dbs/model'
})
//
// 添加请求拦截器
$http.interceptors.request.use( config =>{
	// 在发送请求之前做些什么
  //设置请求头
//	var token = getTicket('token') ? getTicket('token'):''
//	config.headers.common['access-token'] = token
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 添加响应拦截器
$http.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	// 如果是错误返回  这里可以统一抛出错误
	return checkResponse(response);
}, function (error) {
	// 对响应错误做点什么
	// 异常处理
	return Promise.reject(error);
});
function checkResponse(response){
  let res
	if(response.data.code == '0'){
		//获取数据
    res = JSON.parse(JSON.stringify(response.data.data))
		return Promise.resolve(res)
	}else{
    res = null
    v.$alert(response.data.message, '失败', {
      confirmButtonText: '确定',
		})
		return Promise.reject(res)
		// return response.data.data

	}
}
export default function(method, url, data = null) {
	method = method.toLowerCase();
	if(method =='post') {
		return $http.post(url,Qs.stringify(data))
	} else if(method == 'get') {
		return $http.get(url, {params: data})
	} else if(method =='delete') {
		return $http.delete(url, {params: data})
	} else if(method =='put') {
		return $http.put(url, Qs.stringify(data))
  } else if(method =='file') {
		return $http.post(url, data)
  }  
  else {
		console.error('未知的method' +method)
		return false
	}
}